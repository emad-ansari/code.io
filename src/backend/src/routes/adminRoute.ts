import { json, Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import path from "path";
import { NewProblemInput } from "./contributionRoute";
import { z } from "zod";

router.post("/signup", async (req: Request, res: Response) => {});

router.post("/login", async (req: Request, res: Response) => {});

router.get("/new-problems", async (req: Request, res: Response) => {
	try {
		// get all new problems from contribute/newproblem folder
		// and send it to admin for review
		const ALL_PROBLEMS = getAllNewProblem();
        return res.status(200).json({
            data: ALL_PROBLEMS
        })
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});
router.get("/new-testcases", async (req: Request, res: Response) => {
	try {
		// get all new testcases from contribute/newtestcases folder
		// and send it to admin for review
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});
// Save problem after review
router.post("/save-problem", async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// Save testcase after review
router.post("/save-testcase", async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// After problem details if find error while reviewing
router.post("/update-problem", async (req: Request, res: Response) => {
	try {
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// After testcase details if find error while reviewing
router.get("/update-tesctcase", async (req: Request, res: Response) => {
	try {
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

export default router;
