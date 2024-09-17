import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import path from "path";
import { NewProblemInput, NewTestCaseFormat } from "./contributionRoute";
import { z } from "zod";
import { createProblem } from "../db/problem";
import { ParseProblemDetails } from "../lib";
import { addTestCases, createTestCases } from "../db/testcase";
import { createBoilerplateCode } from "../db/boilerplate";
import { TestCaseParser } from "../lib/testcaseParser";
import { CustomRequestObject } from "../middleware/auth";
import { createAdmin } from "../db/admin";
import prisma from "../db";

const SignUpInput = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
});

router.post("/signup", async (req: Request, res: Response) => {
	const parsedSingUpInput = SignUpInput.safeParse(req.body);
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

router.post("/login", async (req: Request, res: Response) => {});

router.get("/new-problems", async (req: Request, res: Response) => {
	try {
		// get all new problems from contribute/newproblem folder
		// and send it to admin for review
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
		// get all new testcases from contribute/newtestcases folder
		// and send it to admin for review
		const ALL_TESTCASES = getAllNewTestcases();
		return res.status(200).json({ testcases: ALL_TESTCASES });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	js: { name: "javascript", languageId: 1 },
	cpp: { name: "cpp", languageId: 2 },
	typescript: { name: "typescript", languageId: 3 },
	java: { name: "java", languageId: 4 },
	python: { name: "python", languageId: 5 },
};

const id = LNAGUAGE_MAPPING["java"];

// Save problem after review
router.post("/save-problem", async (req: Request, res: Response) => {
	const { problemId } = req.body;
	try {
		// save the problem and testcases in database with with given problemId
		const isSaved = saveProblemAndTestCase(problemId);
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
router.post("/save-testcase", async (req: Request, res: Response) => {
	const { testcaesId } = req.body;

	try {
		saveTestCases(testcaesId);
		return res
			.status(200)
			.json({ message: "testcase has been saved successfuly" });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// After problem details if find error while reviewing
router.post("/update-problem", async (req: Request, res: Response) => {
	const { problemId, updatedProblem } = req.body;
	const { userAuthorized, userId } = req as CustomRequestObject;
	try {
		//  admin want to make some changes to user created problem, to remove mistakes and error
		// read the folder path and updated the all detials
		const folderPath = path.join(__dirname, "contribute", "newproblem");
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			if (path.extname(file) === ".json") {
				const filePath = path.join(folderPath, file);
				const parser = new ParseProblemDetails();
				const problem = parser.extractProblemDetails(filePath);
				if (problem.id === problemId) {
					// then update the details
					const newProblemInfo = { ...updatedProblem, userId };

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
router.get("/update-tesctcase", async (req: Request, res: Response) => {
	const { userId, userAuthorized } = req as CustomRequestObject;
	const { testcaseId, updatedTestCase } = req.body;
	try {
		const folderPath = path.join(__dirname, "contribute", "newtestcase");
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			if (path.extname(file) === ".json") {
				const filePath = path.join(folderPath, file);
				const parser = new TestCaseParser();
				const testcase = parser.extractTestCaseDetails(filePath);
				if (testcase.id === testcaseId) {
					// then update the details
					const newProblemInfo = { ...updatedTestCase, userId };

					const jsonString = JSON.stringify(newProblemInfo, null, 2);

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

type ProblemType = z.infer<typeof NewProblemInput>;

function getAllNewProblem(): ProblemType[] {
	let problems: ProblemType[] = [];
	const folderPath = path.join(__dirname, "contribute", "newproblem");
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
	return problems;
}

type TestCaseType = z.infer<typeof NewTestCaseFormat>;

function getAllNewTestcases(): TestCaseType[] {
	let testcases: TestCaseType[] = [];
	const folderPath = path.join(__dirname, "contribute", "newtestcase");
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
					testcaseId: jsonData.testcaseId,
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

function saveProblemAndTestCase(problemId: string): {
	success: boolean;
	err: string;
} {
	const folderPath = path.join(__dirname, "contribute", "newproblem");
	const files = fs.readdirSync(folderPath);

	files.forEach(async (file) => {
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
					const isBoilerplateSaved = saveBoilerplateCodes(
						newProblem.id,
						array
					);
					return {
						success: true,
						err: "",
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
	});
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
function saveTestCases(tempTestcaseId: string) {
	const folderPath = path.join(__dirname, "contribute", "newtestcase");
	const files = fs.readdirSync(folderPath);
	files.forEach(async (file) => {
		if (path.extname(file) === ".json") {
			const filePath = path.join(folderPath, file);
			// need to extract the testcase here
			const parser = new TestCaseParser();
			const testcaseDetails = parser.extractTestCaseDetails(filePath);
			if (testcaseDetails.id === tempTestcaseId) {
				addTestCases(testcaseDetails.title, testcaseDetails.testcases);
			}
		}
	});
}

export default router;
