import { Request, Response, Router } from "express";
const router = Router();
import { CustomRequestObject } from "../middleware/auth";
import {
	convertDifficultyToEnum,
	ProblemCategorySchema,
	ProblemSchema,
} from "../@utils/types";
import {
	createNewProblemCategory,
	getAllCategory,
} from "../db/problem-category";
import {
	createProblem,
	getProblemsOnAdminPage,
} from "../db/problem";

// CREATE: new problem category
router.post("/create-problem-category", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "ADMIN") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const parsedInput = ProblemCategorySchema.safeParse(req.body);
		if (!parsedInput.success) {
			return res.json({
				success: false,
				msg: parsedInput.error,
			});
		}

		const result = await createNewProblemCategory(parsedInput.data);
		return res.json({ success: result.success, msg: result.msg });
	} catch (error: any) {
		console.log("CREATE_CATEGORY_ERROR", error);
	}
});

// GET: All Category
router.post("/get-all-category", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "ADMIN") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const result = await getAllCategory();
		return res.json({
			success: true,
			msg: "All Categories",
			categories: result,
		});
	} catch (error: any) {
		console.log("GET_ALL_CATEGORY_ERROR", error);
	}
});

// CREATE: New problem
router.post("/create-problem", async (req: Request, res: Response) => {
	const { userAuthorized, userId, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "ADMIN") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const data = req.body;
		const difficultyEnum = convertDifficultyToEnum(data.difficulty);

		const parsedInput = ProblemSchema.safeParse({
			...data,
			difficulty: difficultyEnum,
		});
		if (!parsedInput.success) {
			return res.json({
				success: false,
				msg: parsedInput.error,
			});
		}

		const result = await createProblem(parsedInput.data, userId);

		return res.json({ success: result.success, msg: result.msg });
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});

// GET problems on admin page
router.get("get-all-problems", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;
	const page = Number(req.query.pageNumber) || 1;

	if (!userAuthorized || role != "ADMIN") {
		return res.status(404).json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const problems = getProblemsOnAdminPage(page);
		return res
			.status(200)
			.json({
				success: true,
				msg: "Successfully fetched all  Problems",
				data: problems,
			});
	} catch (error: any) {
		console.log("GET-ALL_PROBLMES_ERROR", error);
	}
});

export default router;
