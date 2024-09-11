import { Request, Router, Response } from "express";
const router = Router();
import { problems } from "../../problem";
import { z } from "zod";
import axios from "axios";
import auth, { CustomRequestObject } from "../middleware/auth";
import * as fs from "fs";
import { GenerateFullProblemDefinition } from '../lib/generateFullProblemDefinition'

interface Problem {
	problemId: number;
	problemTitle: string;
	problemDescription: string;
	difficultyLevel: string;
	problemStatus: string;
	problemNo: number;
}

const ProblemSubmissionData = z.object({
	problemId: z.string(),
	languageId: z.number(),
	code: z.string(),
});

router.get("/", (req: Request, res: Response) => {
	console.log("request reach here");
	const q = req.query;
	const pageNumber = Number(q.page);
	const pageSize = Number(q.pageSize);
	const difficultyLevel = String(q.difficultyLevel);
	console.log(difficultyLevel);
	const startIndex = (pageNumber - 1) * pageSize;
	let problemsSet = problems;

	if (difficultyLevel !== "") {
		problemsSet = problemsSet.filter(
			(problem) => problem.difficultyLevel === difficultyLevel
		);
	}
	const endIndex = Math.min(pageNumber * pageSize, problemsSet.length);
	const newProblemSet = problemsSet.slice(startIndex, endIndex);
	const totalPages = Math.ceil(problemsSet.length / pageSize);

	return res
		.status(200)
		.json({ message: "success", data: newProblemSet, totalPages });
});

// filter the problem based on action type {difficulty, status}
router.get("filter-problem", auth, async (req: Request, res: Response) => {
	try {
		/*
			- action type : [difficulty, status]
			- action value: difficulty -> [easy, medium, hard], status -> [todo, solved, attempted]
			- pageNumber:  current page number
			- pageSize :  problem render per page
		*/
		const { actionType, pageSize } = req.body;
		const { pageNumber, actionValue } = req.query;
	} catch (error: any) {}
});

router.post("/submit-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;
	const { testcases } = req.body;

	try {
		// if (!userAuthorized) {
		// 	return res
		// 		.status(400)
		// 		.json({ message: "your are not authorized, please login" });
		// }
		const parseUserSubmitCode = ProblemSubmissionData.safeParse(req.body);
		if (!parseUserSubmitCode.success) {
			return res.status(401).json({ error: parseUserSubmitCode.error });
		}
		const { problemId, languageId, code } = parseUserSubmitCode.data;
		// now you have to make api call to judg0 server to evalute the code
		const JUDGE0_API_URL =`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false&wait=true`;
		const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;


		// first get all the test cases from database

		// const testcaseArray: any = [];


		// 3. create submission array
		const submissions: {
			language_id: number;
			source_code: string,
			exptected_output: string
		}[] = testcases.map((testcase: any) => {
			const parser = new GenerateFullProblemDefinition
			parser.parseTestCase(testcase);
			//getProblem() --> { fullBoilerplate code, stdin, stdout, }
			const problem = parser.getProblem(languageId, code);

			return {
				language_id: languageId, // Java ID for Judge0
				source_code: problem.fullBoilerplatecode,
				stdin: problem.stdin,
				expected_output: JSON.stringify(problem.stdout)
			};
		});

		console.log('this is submission array: ', submissions);
		return res.json({data: submissions});

		// 4. make api call
		const data = JSON.stringify({submissions});

		// const submissionResponse = await axios.post(JUDGE0_API_URL, data,
		// 	{
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
		// 			"x-rapidapi-key": JUDGE0_API_KEY,
		// 		},
		// 	}
		// );
	} catch (error: any) {}
});



export default router;

/*
	
	Create multiple submissions at once
	POST https://ce.judge0.com/submissions/batch?base64_encoded=false

	- Get multiple submissions at once.
	 https://ce.judge0.com/submissions/batch{?tokens,base64_encoded,fields}

*/