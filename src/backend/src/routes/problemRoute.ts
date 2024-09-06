import { Request, Router, Response } from "express";
const router = Router();
import { problems } from "../../problem";
import { z } from "zod";
import axios from "axios";
import auth, { CustomRequestObject } from "../middleware/auth";
import * as fs from "fs";


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

	try {
		if (!userAuthorized) {
			return res
				.status(400)
				.json({ message: "your are not authorize, please login" });
		}
		const parseUserSubmitCode = ProblemSubmissionData.safeParse(req.body);
		if (!parseUserSubmitCode.success) {
			return res.status(401).json({ error: parseUserSubmitCode.error });
		}
		const { problemId, languageId, code } = parseUserSubmitCode.data;
		// now you have to make api call to judg0 server to evalute the code
		const JUDGE0_API_URL =`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false&wait=true`;
		const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;


		// first get all the test cases from database

		const testcaseArray: any = [];

		// const problem = getProblem(testcaseArray);
		// const fullBoilerPlatecode = problem.fullboilerPlatecode.replace("__USER_CODE_HERE__", code);
		// 3. create submission array
		// const submissions: {
		// 	language_id: number;
		// 	source_code: string,
		// 	exptected_output: string
		// }[] = testcaseArray.map(testcase => {
		// 	const source_code = generateJavaCode(testcase);
		// 	return {
		// 		language_id: 62, // Java ID for Judge0
		// 		source_code: source_code,
		// 		expected_output: JSON.stringify(testcase.stdout)
		// 	};
		// });

		// 4. make api call
		// const data = JSON.stringify({submissions});

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

function getFullProblemDefinition(languageId: number): string{
	switch(languageId){
		case 62:
			// return javaFullCode();
		case 71:
			// return pythonFullCode();
		case 74:
			// return typescriptFullCode();
		case 63:
			// return javascriptFullCode();
		case 10:
			// return cppFullCode()
		default: return '';
	}
} 

function getOuput(){

}
export default router;

/*
	- [Tomorrow taks]: 
	- tyr to find in algorithmic arena that where code is submited to judge0 server
	- then also clear that all testcases are given at once or they are given just one by one
	- test cases are string []
	- expected output are string[] 
	Create multiple submissions at once
	POST https://ce.judge0.com/submissions/batch?base64_encoded=false


	- Get multiple submissions at once.
	 https://ce.judge0.com/submissions/batch{?tokens,base64_encoded,fields}


	 -

*/