import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import path from "path";
import { ProblemType, TestCaseType, SignUpInput, LoginInput } from "../@utils/types";
import { createProblem } from "../db/problem";
import { ParseProblemDetails } from "../lib";
import { addTestCases, createTestCases } from "../db/testcase";
import { createBoilerplateCode } from "../db/boilerplate";
import { TestCaseParser } from "../lib/testcaseParser";
import { CustomRequestObject } from "../middleware/auth";
import { createAdmin, findAdmin } from "../db/admin";
import  jwt from "jsonwebtoken";
import auth from "../middleware/auth";
import prisma from "../db";
import { TestCase } from "../db/testcase";


router.post("/signup", async (req: Request, res: Response) => {
	const parsedSingUpInput = SignUpInput.safeParse(req.body.data);
	if (!parsedSingUpInput.success) {
		return res.status(400).json({ err: parsedSingUpInput.error });
	}
	try {
		const { username, email, password } = parsedSingUpInput.data
		const admin = await prisma.admin.findFirst({
			where: {
				email: parsedSingUpInput.data.email
			}
		})
		if (admin){
			return res.status(400).json({ msg: "Admin already exist"})
		}
		// create a new admin
		const result = await createAdmin(username, email, password);
		if (result.success){
			return res.status(200).json({msg: result.msg})
		}
		return res.status(400).json({msg: result.msg})

	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ err: error.message });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const parsedLoginInput = LoginInput.safeParse(req.body.data);
	if (!parsedLoginInput.success){
		return res.status(400).json({ err: parsedLoginInput.error});
	}
	try {
		const { email, password } = parsedLoginInput.data;
		// check if admin exist or not
		const admin = await findAdmin(email, password);
		if (!admin.success){
			return res.json({ err: admin.msg});
		}
		// else create jwt token 
		const token = jwt.sign({ userId: admin.adminId, role: "admin" } , process.env.JWT_SECRET!, { expiresIn: '1d'} )
		return res.status(201).json({ msg: 'login successfully' ,  adminToken: token })
	}
	catch(error: any){
		console.error(error.message);
		return res.status(500).json({err: error.message});
	}
});


router.get("/new-problems", async (req: Request, res: Response) => {
	try {
		const ALL_PROBLEMS = getAllNewProblem();
		return res.status(200).json({
			problems: ALL_PROBLEMS,
		});
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

router.get("/new-testcases", async (req: Request, res: Response) => {
	try {
		const ALL_TESTCASES = getAllNewTestcases();
		return res.status(200).json({ testcases: ALL_TESTCASES });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	js: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 10 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};


// Save problem after review
router.post("/save-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const { problemId } = req.body.data;
	console.log('request on server')
	if (!userAuthorized){
		console.log('not authorized');
		return res.status(401).json({ err: "You are not authorize, please login "})
	}
	const { role } = req as CustomRequestObject;
	if ( role !== 'admin') return res.json({ err: " You are not admin"});

	try {
		// save the problem and testcases in database with with given problemId
		
		const isSaved = await  saveProblemAndTestCase(problemId);
		if (isSaved.success) {
			// then prepare the boilerplate code array to save them into database
			return res
				.status(200)
				.json({ msg: "Problem has been saved successfully" });
		}
		return res.status(200).json({ error: isSaved.err });

	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// Save testcase after review - here we are going to save the testcase of existing problem
router.post("/add-testcase", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const { title } = req.body;
	if (!userAuthorized){
		return res.status(401).json({ err: "You are not authorize, please login "})
	}
	const { role } = req as CustomRequestObject;
	if ( role !== 'admin') return res.json({ err: " You are not admin"});

	try {
		saveTestCases(title); // edit this function
		return res
			.status(200)
			.json({ message: "testcase has been saved successfuly" });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// After problem details if find error while reviewing
router.post("/update-problem", auth, async (req: Request, res: Response) => {
	const { problemId, updatedProblem } = req.body;
	const { userAuthorized } = req as CustomRequestObject;
	if (!userAuthorized){
		return res.status(401).json({ err: "You are not authorize, please login "})
	}
	const { role } = req as CustomRequestObject;

	if ( role !== 'admin') return res.json({ err: " You are not admin"});
	
	try {
	
		const folderPath = path.join(__dirname, "contribute", "newproblem");
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			if (path.extname(file) === ".json") {
				const filePath = path.join(folderPath, file);
				const parser = new ParseProblemDetails();
				const problem = parser.extractProblemDetails(filePath);
				if (problem.id === problemId) {
					// then update the details
					const newProblemInfo = { ...updatedProblem, userId: problem.userId };

					const jsonString = JSON.stringify(newProblemInfo, null, 2);

					fs.writeFile(filePath, jsonString, (err) => {
						if (err) {
							console.log("Error writing file", err);
							return res.status(500).json({
								err: "server is not able to save you problem please try again!!",
							});
						} else {
							console.log(
								"Updated problem successfully written to file"
							);
							return res.status(200).json({
								msg: "Problem has been updated successfully",
							});
						}
					});
				}
			}
		});
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// After testcase details if find error while reviewing
router.get("/update-tesctcase", auth,  async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	if (!userAuthorized){
		return res.status(401).json({ err: "You are not authorize, please login "})
	}
	const { role } = req as CustomRequestObject;

	if ( role !== 'admin') return res.json({ err: " You are not admin"});
	
	const { updatedTestCase } = req.body;

	try {
		const folderPath = path.join(__dirname, "contribute", "newtestcase");
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			if (path.extname(file) === ".json") {
				const filePath = path.join(folderPath, file);
				const parser = new TestCaseParser();
				const testcase = parser.extractTestCaseDetails(filePath);

				if (testcase.title === updatedTestCase.title ) {
					// then update the details
					const modifiedTestcases: TestCase[] = testcase.testcases.map(t => t.testcaseId === updatedTestCase.testcaseId ? updatedTestCase : t);
					
					const updatedProblemInfo  = { ... testcase, testcases: modifiedTestcases };

					const jsonString = JSON.stringify(updatedProblemInfo , null, 2);

					fs.writeFile(filePath, jsonString, (err) => {
						if (err) {
							console.log("Error writing file", err);
							return res.status(500).json({
								err: "server is not able to save you problem please try again!!",
							});
						} else {
							console.log(
								"Updated Testcase successfully written to file"
							);
							return res.status(200).json({
								msg: "Testcase has been updated successfully",
							});
						}
					});
				}
			}
		});
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});



function getAllNewProblem(): ProblemType[] {
	let problems: ProblemType[] = [];
	const folderPath = `src/contribution/newproblem`
	const files = fs.readdirSync(folderPath);
	
	files.forEach((file) => {
		// Only process JSON files
		if (path.extname(file) === ".json") {
			const filePath = path.join(folderPath, file);

			// Read the file contents
			const fileContents = fs.readFileSync(filePath, "utf-8");

			try {
				// Parse the JSON content
				const jsonData = JSON.parse(fileContents);
				const newProblem = {
					id: jsonData.id,
					title: jsonData.title,
					description: jsonData.default,
					difficulty: jsonData.difficulty,
					returnType: jsonData.returnType,
					parameters: jsonData.parameters,
					testcases: jsonData.testcases,
				};
				problems.push(newProblem);
			} catch (err) {
				console.error(`Error parsing JSON in file ${file}:`, err);
			}
		}
	});
	return problems;
}



function getAllNewTestcases(): TestCaseType[] {
	let testcases: TestCaseType[] = [];
	const folderPath = `src/contribution/newtestcase`
	const files = fs.readdirSync(folderPath);
	files.forEach((file) => {
		// Only process JSON files
		if (path.extname(file) === ".json") {
			const filePath = path.join(folderPath, file);

			// Read the file contents
			const fileContents = fs.readFileSync(filePath, "utf-8");

			try {
				// Parse the JSON content
				const jsonData = JSON.parse(fileContents);
				const newTestcase: TestCaseType = {
					problemTitle: jsonData.problemTitle,
					testcases: jsonData.testcases,
				};
				testcases.push(newTestcase);
				// Do something with the JSON data
				console.log("Title:", jsonData.title);
				console.log("Description:", jsonData.description);
				console.log("Difficulty:", jsonData.difficulty);
				console.log("Testcases:", jsonData.testcases);
				console.log("-----------------------------------");
			} catch (err) {
				console.error(`Error parsing JSON in file ${file}:`, err);
			}
		}
	});
	return testcases;
}

async function saveProblemAndTestCase(problemId: string):Promise<{success: boolean, err: string}> {
	const folderPath = `src/contribution/newproblem`
	const files = fs.readdirSync(folderPath);
	console.log('these are files', files);
	console.log('problemId: ', problemId)

	for (let file of files) {
		// Only process JSON files
		if (path.extname(file) === ".json") {
			const filePath = path.join(folderPath, file);

			// Read the file contents
			try {
				// Parse the JSON content
				const parser = new ParseProblemDetails();
				const problem = parser.extractProblemDetails(filePath);
				if (problem.id === problemId) {
					// read the details and save it into database
				
					const newProblem = await createProblem(
						problem.title,
						problem.description,
						problem.difficulty,
						problem.userId
					);

					if (!newProblem.success) {
						console.log("Error: ", newProblem.msg);
						return {
							success: false,
							err: newProblem.msg,
						};
					}
					// save testcase
					const newTestcase = await createTestCases({
						problemId: newProblem.id,
						title: problem.title,
						testcases: problem.testcases,
					});
					if (!newTestcase.success) {
						console.log(newTestcase.msg);
						return {
							success: false,
							err: newTestcase.msg,
						};
					}

					const java = parser.getJavaBoilerplateCode();
					const cpp = parser.getCppBoilerplateCode();
					const typescript = parser.getTypescriptBoilerplateCode();
					const array = [
						{ name: "java", code: java },
						{ name: "cpp", code: cpp },
						{ name: "typescript", code: typescript },
					];
					// save boiler plate code
					await saveBoilerplateCodes(
						newProblem.id,
						array
					);
					console.log('control reaches here...');
					return {
						success: true,
						err: "No error",
					};
					
				}
			} catch (err) {
				console.error(`Error parsing JSON in file ${file}:`, err);
				return {
					success: false,
					err: `Error parsing JSON in file ${file}: ${err}`,
				};
			}
		}
	};
	return {
		success: false,
		err: "Error while checking file",
	};
}

async function saveBoilerplateCodes(
	problemId: string,
	languages: { name: string; code: string }[]
) {
	try {
		const boilerplateCodes: { languageId: number; code: string }[] =
			languages.map((language) => {
				return {
					languageId: LNAGUAGE_MAPPING[`${language.name}`].languageId,
					code: language.code,
				};
			});
		await createBoilerplateCode({ problemId, boilerplateCodes }); // database call to save the boilerplate code;
	} catch (error: any) {
		console.log(error.message);
	}
}

// here you are going to save the testcase that already exist.
function saveTestCases(title: string) {
	const folderPath = path.join(__dirname, "contribute", "newtestcase");
	const files = fs.readdirSync(folderPath);
	files.forEach(async (file) => {
		if (path.extname(file) === ".json") {
			const filePath = path.join(folderPath, file);
			// need to extract the testcase here
			const parser = new TestCaseParser();
			const testcaseDetails = parser.extractTestCaseDetails(filePath);
			if (testcaseDetails.title === title) {
				addTestCases(testcaseDetails.title, testcaseDetails.testcases);
			}
		}
	});
}

export default router;
