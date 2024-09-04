import { Request, Router, Response } from "express";
const router = Router();
import { problems } from "../../problem";

import auth from "../middleware/auth";
import * as fs from 'fs';

interface Problem {
	problemId: number;
	problemTitle: string;
	problemDescription: string;
	difficultyLevel: string;
	problemStatus: string;
	problemNo: number;
}

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

router.post("/submit-problem", async (req: Request, res: Response) => {
	try {
	} catch (error: any) {}
});

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

	 - instead of mounting a input file path just provide the input(as stdin) testcase and exptected_output
	 -

*/
