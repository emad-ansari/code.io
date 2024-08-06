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

export default router;
