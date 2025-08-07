import { Request, Router, Response } from "express";
const router = Router();
import auth, { CustomRequestObject } from "../middleware/auth";
import { getAllProblems, getProblemDetail} from "../db/problem";

// GET ALL PROBLEMS
router.get("/get-problems", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

	const categoryName = req.query.category as string;
	const page = Number(req.query.pageNumber) || 1;
	const problemPerPage = Number(req.query.pageSize);
	const difficulty = req.query.difficulty as string | undefined;
	const status = req.query.status as string | undefined;
	const searchKeywords = req.query.searchKeywords as string | undefined;

	try {
		const filterQuery: {
			difficulty?: string;
			status?: string;
			searchKeywords?: string;
		} = {};

		if (difficulty) filterQuery.difficulty = difficulty;
		if (status) filterQuery.status = status;
		if (searchKeywords) filterQuery.searchKeywords = searchKeywords;

		const result = await getAllProblems(
			categoryName,
			page,
			problemPerPage,
			filterQuery,
			userAuthorized
		);

		return res.status(200).json({
			success: true,
			msg: "Successfully fetched all problems",
			data: {
				problems: result?.problems,
				totalPages: result?.totalCount,
			},
		});
	} catch (e: any) {
		console.error(e.message);
		return res.status(500).json({ success: false, message: e.message });
	}
});

// GET PROBLEM DETAILS
router.get(
	"/get-problem-detail/:problemId",
	auth,
	async (req: Request, res: Response) => {
		const { problemId } = req.params;
		const { userAuthorized } = req as CustomRequestObject;
		try {
			const problemDetails = await getProblemDetail(
				problemId,
				userAuthorized
			);
			return res.status(200).json({
				success: true,
				msg: "Successfull fetched problem Details",
				data: problemDetails,
			});
		} catch (error: any) {
			console.log(error.message);
			return res.json({ success: false, message: error.message });
		}
	}
);


// router.get("/default-code", async (req: Request, res: Response) => {
// 	try {
// 		const query = req.query;
// 		const problemTitle = String(query.problemTitle);
// 		const langId = Number(query.languageId);

// 		const problem = await prisma.problem.findFirst({
// 			where: {
// 				title: problemTitle,
// 			},
// 			select: {
// 				id: true,
// 				title: true,
// 			},
// 		});
// 		if (problem && problem.title === problemTitle) {
// 			const result = await prisma.defaultCode.findFirst({
// 				where: {
// 					problemId: problem.id,
// 					languageId: langId,
// 				},
// 				select: {
// 					code: true,
// 				},
// 			});
// 			return res.json({
// 				success: true,
// 				message: "success",
// 				data: { defaultCode: result?.code },
// 			});
// 		}
// 		return res
// 			.status(204)
// 			.json({ success: false, message: "problem not found" });
// 	} catch (error: any) {
// 		console.log(error);
// 		return res.json({ success: false, message: "error" });
// 	}
// });

// export default router;

// // router.post('/judge0-callback', async(req: Request, res: Response) => {
// // 	try {
// // 		const payload = req.body; // Parse the JSON payload sent by Judge0
// // 		console.log('Judge0 callback received:', payload);
// // 	}
// // 	catch(error: any){
// // 		console.error('Error handling Judge0 callback:', error);
// // 		res.status(500).send('Internal Server Error'); // Handle error appropriately
// // 	}

// // })

// // when you are going to submit the code
