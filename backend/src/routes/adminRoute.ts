import { Request, Response, Router } from "express";
const router = Router();
import { CustomRequestObject } from "../middleware/auth";
import {
	ProblemCategorySchema,
} from "../@utils/types";
import {
	createNewProblemCategory,
	getAllCategoryOnAdminPage,
} from "../db/problem-category";
import { getProblemsOnAdminPage } from "../db/problem";
import { getAllUsers } from "../db/user";

// CREATE: new problem category
router.post("/create-category", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "ADMIN") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const parsedInput = ProblemCategorySchema.safeParse(req.body.data);
		if (!parsedInput.success) {
			return res.json({
				success: false,
				msg: parsedInput.error,
			});
		}
		console.log('parsed data: ', parsedInput.data)
		const result = await createNewProblemCategory(parsedInput.data);
		return res.json({
			success: result.success,
			msg: result.msg,
		});
	} catch (error: any) {
		console.log("CREATE_CATEGORY_ERROR", error);
	}
});

// GET: All Category ON ADMIN PAGE
router.post("/get-all-category", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;

	if (!userAuthorized || role != "ADMIN") {
		return res.json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}
	try {
		const result = await getAllCategoryOnAdminPage();
		return res.json({
			success: true,
			msg: "All Categories",
			categories: result,
		});
	} catch (error: any) {
		console.log("GET_ALL_CATEGORY_ERROR", error);
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
		return res.status(200).json({
			success: true,
			msg: "Successfully fetched all  Problems",
			data: problems,
		});
	} catch (error: any) {
		console.log("GET-ALL_PROBLMES_ERROR", error);
	}
});

// GET ALL USERS route
router.get("/get-all-users", async (req: Request, res: Response) => {
	const { userAuthorized, role } = req as CustomRequestObject;
	const { page } = req.body;

	if (!userAuthorized || role != "ADMIN") {
		return res.status(404).json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}

	try {
		const users = getAllUsers(Number(page));
		return res
			.status(200)
			.json({ success: true, msg: "All users", data: users });
	} catch (error: any) {}
});

export default router;
