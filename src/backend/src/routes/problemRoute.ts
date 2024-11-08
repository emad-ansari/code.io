import { Request, Router, Response } from "express";
const router = Router();

import prisma from "../db";
import {
	getProblemDetail,
	getOneProblemStatusOnUser,
	getAllProblems,
	getTotalPages,
} from "../db/problem";
import auth, { CustomRequestObject } from "../middleware/auth";
import { ProblemDetailWithStatusOnUser } from "../@utils/types";

router.get("/filter-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

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

		const problems = await getAllProblems(
			page,
			problemPerPage,
			filterQuery
		);

		const totalPages = await getTotalPages(problemPerPage, filterQuery);
		if (userAuthorized) {
			return res.status(200).json({
				success: true,
				message: "Filtered problems",
				data: {
					problems,
					totalPages,
				},
			});
		} else {
			// if user is not authorize then remove the status property from problems
			const problemsWithoutStatus = problems?.map((p) => {
				return {
					id: p.id,
					title: p.title,
					problemNo: p.problemNo,
					difficulty: p.difficulty,
				};
			});
			return res.status(200).json({
				success: true,
				message: "filtered problem without status",
				data: {
					problems: problemsWithoutStatus,
					totalPages,
				},
			});
		}
	} catch (e: any) {
		console.error(e.message);
		return res.status(500).json({ success: false, message: e.message });
	}
});

router.get(
	"/get-problem-details/:title",
	auth,
	async (req: Request, res: Response) => {
		const { title } = req.params;
		const { userAuthorized } = req as CustomRequestObject;
		try {
			// get the problem detail along with testcase examples
			const result = await getProblemDetail(title);
			if (!result.success || result.problemDetail == undefined) {
				return res.json({ success: false, message: result.msg });
			}

			if (userAuthorized) {
				const { userId } = req as CustomRequestObject;
				// find the staus of user regarding the problem
				const response = await getOneProblemStatusOnUser(
					userId,
					result.problemDetail.id
				);
				if (!response.success || response.status === undefined) {
					return res.json({ success: false, message: response.msg });
				}

				const problemDetailWithStatusOnUser: ProblemDetailWithStatusOnUser =
					{
						...result.problemDetail,
						problemStatus: { status: response.status },
					};

				return res.json({
					success: true,
					message: result.msg,
					data: problemDetailWithStatusOnUser,
				});
			} else {
				// if user is not authorized then only send the problemDetail to guest user

				return res.json({
					success: true,
					message: result.msg,
					data: result.problemDetail,
				});
			}
		} catch (error: any) {
			console.log(error.message);
			return res.json({ success: false, message: error.message });
		}
	}
);

router.get("/default-code", async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const problemTitle = String(query.problemTitle);
		const langId = Number(query.languageId);

		const problem = await prisma.problem.findFirst({
			where: {
				title: problemTitle,
			},
			select: {
				id: true,
				title: true,
			},
		});
		if (problem && problem.title === problemTitle) {
			const result = await prisma.defaultCode.findFirst({
				where: {
					problemId: problem.id,
					languageId: langId,
				},
				select: {
					code: true,
				},
			});
			return res.json({
				success: true,
				message: "success",
				data: { defaultCode: result?.code },
			});
		}
		return res
			.status(204)
			.json({ success: false, message: "problem not found" });
	} catch (error: any) {
		console.log(error);
		return res.json({ success: false, message: "error" });
	}
});

export default router;

// router.post('/judge0-callback', async(req: Request, res: Response) => {
// 	try {
// 		const payload = req.body; // Parse the JSON payload sent by Judge0
// 		console.log('Judge0 callback received:', payload);
// 	}
// 	catch(error: any){
// 		console.error('Error handling Judge0 callback:', error);
// 		res.status(500).send('Internal Server Error'); // Handle error appropriately
// 	}

// })

// when you are going to submit the code
