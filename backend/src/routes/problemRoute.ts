import { Request, Router, Response } from "express";
const router = Router();
import auth, { CustomRequestObject } from "../middleware/auth";
import {
	createProblem,
	getAllProblems,
	getDefualtCode,
	getProblemDetail,
	updateLikes,
} from "../db/problem";
import { getAllCategory } from "../db/problem-category";
import { ProblemSchema } from "../@utils/types";

// create new category
router.post("/create-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "Admin") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const data = req.body.data;

		const parsedInput = ProblemSchema.safeParse(data);
		if (!parsedInput.success) {
			return res.json({
				success: false,
				msg: parsedInput.error,
			});
		}
		console.log("incomming data after parsing : ", req.body.data);

		const result = await createProblem(parsedInput.data, userId);

		return res.json({ success: result.success, msg: result.msg });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// get all problems
router.get("/get-problems", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	const categoryName = req.query.category as string;
	const page = Number(req.query.page) || 1;
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
			userAuthorized,
			userId
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

// get problem details
router.get(
	"/get-problem-details/:problemId",
	auth,
	async (req: Request, res: Response) => {
		const { problemId } = req.params;
		const { userAuthorized, userId } = req as CustomRequestObject;

		try {
			const problemDetails = await getProblemDetail(
				problemId,
				userAuthorized,
				userId
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

// get all categories
router.get("/get-categories", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;
	try {
		const categories = await getAllCategory(userAuthorized, userId);
		return res.status(200).json({
			success: true,
			msg: "Successfully fetched problem category",
			data: categories,
		});
	} catch (error: any) {
		console.log("GET_CATEGORIES_ERROR: ", error);
	}
});

// increase likes
router.post("/update-likes", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;
	if (!userAuthorized) {
		return res.status(401).json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	const problemId = req.body.data;

	try {
		await updateLikes(problemId, userId);
		return res.status(201).json({
			success: true,
			msg: "Likes Updated Successfully",
		});
	} catch (error: any) {
		console.log("UPDATE_LIKES_ROUTE_ERORR: ", error);
		return res.status(500).json({ success: false, msg: error.message });
	}
});

// get default code
router.get("/default-code", async (req: Request, res: Response) => {
	const problemId = req.query.problemId as string;
	const language = req.query.language as string;

	try {
		// const languageId: number = LANGUAGE_MAPPING[language].languageId
		const boilerCode = await getDefualtCode(problemId, language);
		if (!boilerCode) {
			return res.status(404).json("Default code not found!!");
		}
		return res.status(200).json({
			success: true,
			msg: "Successfully fetched default code",
			data: boilerCode,
		});
	} catch (error: any) {
		console.log(error.message);
		return res.status(500).json({ success: false, msg: error.message });
	}
});

export default router;
