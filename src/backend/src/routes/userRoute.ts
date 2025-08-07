import { Request, Response, Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import prisma from "../db";
import { createUser, findUser, getAllUsers } from "../db/user";
import { LoginInputSchema, SignUpInputSchema } from "../@utils/types";
import auth, {
	CustomRequestObject,
	generateAccessToken,
	generateRefreshToken,
} from "../middleware/auth";

router.post("/signup", async (req: Request, res: Response) => {
	const parsedInput = SignUpInputSchema.safeParse(req.body);

	console.log("route hit");
	if (!parsedInput.success) {
		return res
			.status(400)
			.json({ success: false, message: parsedInput.error });
	}

	try {
		const { username, email, password } = parsedInput.data;
		// check if user already exist or not
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
		});
		if (user) {
			return res.json({ success: false, msg: "User already exist" });
		}
		// otherwise user don't exist then create new user
		const newUser = await createUser(username, email, password);
		if (!newUser.success) {
			return res.json({ success: false, message: newUser.msg });
		}
		return res
			.status(200)
			.json({ success: true, msg: "User created successfully" });
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ success: false, msg: error.message });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const parsedInput = LoginInputSchema.safeParse(req.body);
	if (!parsedInput.success) {
		return res
			.status(400)
			.json({ success: false, message: parsedInput.error });
	}
	try {
		const { email, password } = parsedInput.data;
		// check if user exist or not
		const user = await findUser(email, password);
		if (!user.success || user.userId === undefined) {
			return res.json({ success: false, message: user.msg });
		}
		const accessToken = generateAccessToken(user.userId, user.role);
		const refreshToken = generateRefreshToken(user.userId, user.role);

		// Set refresh token in an HTTP-only cookie
		res.cookie("refreshToken", refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 7, // max age 7days  [putting cookie expiration is neccessary]
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/api/auth/", // This end point only
		});

		return res.status(201).json({
			success: true,
			message: "login successfully",
			data: { token: accessToken },
		});
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ success: false, message: error.message });
	}
});

// GET ALL USERS route
router.get("/get-all-users", auth, async (req: Request, res: Response) => {
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
		return res.status(200).json({ success: true, msg: "All users", data: users})
	} catch (error: any) {}
});

// Refresh token endpoint
router.post("/refresh-token", (req: Request, res: Response) => {
	const cookie = req.cookies; // Get refresh token from the cookie

	const refreshToken = cookie.refreshToken;

	if (!refreshToken) {
		return res
			.status(401)
			.json({ success: false, message: "No refresh token found" });
	}

	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_SECRET!,
		(err: any, payload: any) => {
			if (err) {
				return res
					.status(401)
					.json({ success: false, message: err.message });
			}
			// add another security level -> that check whether the user exist in database or not other wise just send 401 resposnse.
			const newAccessToken = generateAccessToken(
				payload.userId,
				payload.role
			);
			return res.status(200).json({
				success: true,
				data: { accessToken: newAccessToken },
				message: "token refresh successfully",
			});
		}
	);
});

router.post("/logout", (req: Request, res: Response) => {
	if (!req.cookies?.refreshToken)
		return res
			.status(204)
			.json({ success: false, message: "No refresh token found" });

	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true, // Set to true in production
		sameSite: "none",
		path: "/api/user/", // This endpoint only
	});
	res.json({ success: true, message: "Logged out successfully" });
});

export default router;
