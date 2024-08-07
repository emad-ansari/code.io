import { Router, Request, Response } from "express";
const router = Router();
import { problems } from "../problem";

router.get("/", (req: Request, res: Response) => {
	console.log("request reach here");
	const q = req.query;
	const page = Number(q.page);
	const pageSize = Number(q.pageSize);

	const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(page * pageSize, problems.length);
    const newProblemSet = problems.slice(startIndex, endIndex);
    const totalPages = Math.ceil(problems.length / pageSize);

	return res.status(200).json({ message: "success", data: newProblemSet, totalPages});
});



router.get("/filter", (req: Request, res: Response) => {
	const q = req.query;
	const pageNumber = Number(q.page);
	const pageSize = Number(q.pageSize);
	const difficultyLevel = String(q.difficultyLevel);
	console.log(pageNumber, pageSize, difficultyLevel);
	const totalNumberOfProblems = problems.filter(problem => problem.difficultyLevel === difficultyLevel);
	const totalPages = Math.ceil(totalNumberOfProblems.length / pageSize);
	const startIndex = (pageNumber - 1) * pageSize;
	const endIndex = Math.min(pageNumber * pageSize, problems.length);
    const newProblemSet = totalNumberOfProblems.slice(startIndex, endIndex);
	console.log(newProblemSet)
	return res.status(200).json({
		message: "success",
		data: newProblemSet, 
		totalPages: totalPages
	});
    
});

export default router;
