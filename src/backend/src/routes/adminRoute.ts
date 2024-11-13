import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import path from "path";


import { createProblem } from "../db/problem";
import { addTestCases, createTestCases, TestCase } from "../db/testcase";
import { TestCaseParser } from "../lib/testcaseParser";
import { ParseProblemDetails } from "../lib";
import { createBoilerplateCode } from "../db/boilerplate";
import auth, { CustomRequestObject } from "../middleware/auth";
import {
	Problem,
	NewTestCase,
	LNAGUAGE_MAPPING,
} from "../@utils/types";

router.get("/problems", async (req: Request, res: Response) => {
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

// Save problem after review
router.post("/save-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const { problemId } = req.body.data;

	if (!userAuthorized) {
		console.log("not authorized");
		return res
			.status(401)
			.json({ err: "You are not authorize, please login " });
	}
	const { role } = req as CustomRequestObject;
	if (role !== "admin") return res.json({ err: " You are not admin" });

	try {
		// save the problem and testcases in database with with given problemId

		const isSaved = await saveProblemAndTestCase(problemId);
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
	if (!userAuthorized) {
		return res
			.status(401)
			.json({ err: "You are not authorize, please login " });
	}
	const { role } = req as CustomRequestObject;
	if (role !== "admin") return res.json({ err: " You are not admin" });

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
	if (!userAuthorized) {
		return res
			.status(401)
			.json({ err: "You are not authorize, please login " });
	}
	const { role } = req as CustomRequestObject;

	if (role !== "admin") return res.json({ err: " You are not admin" });

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
					const newProblemInfo = {
						...updatedProblem,
						userId: problem.userId,
					};

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
router.get("/update-tesctcase", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	if (!userAuthorized) {
		return res
			.status(401)
			.json({ err: "You are not authorize, please login " });
	}
	const { role } = req as CustomRequestObject;

	if (role !== "admin") return res.json({ err: " You are not admin" });

	const { updatedTestCase } = req.body;

	try {
		const folderPath = path.join(__dirname, "contribute", "newtestcase");
		const files = fs.readdirSync(folderPath);

		files.forEach((file) => {
			if (path.extname(file) === ".json") {
				const filePath = path.join(folderPath, file);
				const parser = new TestCaseParser();
				const testcase = parser.extractTestCaseDetails(filePath);

				if (testcase.title === updatedTestCase.title) {
					// then update the details
					const modifiedTestcases: TestCase[] =
						testcase.testcases.map((t) =>
							t.testcaseId === updatedTestCase.testcaseId
								? updatedTestCase
								: t
						);

					const updatedProblemInfo = {
						...testcase,
						testcases: modifiedTestcases,
					};

					const jsonString = JSON.stringify(
						updatedProblemInfo,
						null,
						2
					);

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

function getAllNewProblem(): Problem[] {
	let problems: Problem[] = [];
	const folderPath = `src/contribution/newproblem`;
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

function getAllNewTestcases(): NewTestCase[] {
	let testcases: NewTestCase[] = [];
	const folderPath = `src/contribution/newtestcase`;
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
				const newTestcase: NewTestCase = {
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

async function saveProblemAndTestCase(
	problemId: string
): Promise<{ success: boolean; err: string }> {
	const folderPath = `src/contribution/newproblem`;
	const files = fs.readdirSync(folderPath);

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
					await saveBoilerplateCodes(newProblem.id, array);
					console.log("control reaches here...");
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
	}
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
