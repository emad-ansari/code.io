import { Router, Request, Response } from "express";
const router = Router();
import { problems } from "../problem";

interface Problem { 
	problemId: number;
	problemTitle: string;
	problemDescription: string;
	difficultyLevel: string;
	problemStatus: string;
	problemNo: number
}


router.get("/", (req: Request, res: Response) => {
	console.log("request reach here");
	const q = req.query;
	const pageNumber = Number(q.page);
	const pageSize = Number(q.pageSize);
	const difficultyLevel = String(q.difficultyLevel);
	console.log( difficultyLevel);
	const startIndex = (pageNumber - 1) * pageSize;
	let problemsSet = problems;

	if (difficultyLevel !== '') {
		problemsSet =  problemsSet.filter(problem => problem.difficultyLevel === difficultyLevel);	
	
	}
	const endIndex = Math.min(pageNumber * pageSize, problemsSet.length); 
    const newProblemSet = problemsSet.slice(startIndex, endIndex);
    const totalPages = Math.ceil(problemsSet.length / pageSize); 

	return res.status(200).json({ message: "success", data: newProblemSet, totalPages});
});








export default router;
