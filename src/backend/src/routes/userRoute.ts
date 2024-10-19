import { Request, Response, Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import prisma from "../db";
import { createUser, findUser } from "../db/user";
import { LoginInput, SignUpInput } from "../@utils/types";
import { generateAccessToken, generateRefreshToken } from "../middleware/auth";

router.post("/signup", async (req: Request, res: Response) => {
	const parsedInput = SignUpInput.safeParse(req.body.data);

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
			.json({ success: true, message: "User created successfully" });
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ success: false, message: error.message });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	const parsedInput = LoginInput.safeParse(req.body.data);
	if (!parsedInput.success) {
		return res
			.status(400)
			.json({ success: false, message: parsedInput.error });
	}
	try {
		const { email, password } = parsedInput.data;
		// check if user exist or not
		const userExist = await findUser(email, password);
		if (!userExist.success || userExist.userId === undefined) {
			return res.json({ success: false, message: userExist.msg });
		}
		const accessToken = generateAccessToken(userExist.userId, "user");
		const refreshToken = generateRefreshToken(userExist.userId, "user");

		// Set refresh token in an HTTP-only cookie
		res.cookie("refreshToken", refreshToken, {
			maxAge: 1000 * 60 * 60 * 24 * 7, // max age 7days  [putting cookie expiration is neccessary]
			httpOnly: true,
			secure: true,
			sameSite: "none",
			path: "/api/user/", // This end point only
		});
		console.log('going to send login response')
		return res.status(201).json({
			success: true,
			message: "login successfully",
			token: accessToken,
		});
	} catch (error: any) {
		console.error(error.message);
		return res.status(500).json({ success: false, message: error.message });
	}
});

// Refresh token endpoint
router.post("/refresh-token", (req: Request, res: Response) => {
	const cookie = req.cookies; // Get refresh token from the cookie
	console.log('refresh tokens', cookie);
	const refreshToken = cookie.refreshToken;
	console.log('refresh token', refreshToken);

	if (!refreshToken) {
		return res
			.status(401)
			.json({ success: false, message: "No refresh token found" });
	}

	console.log('refrehs key in refresh route:  ',  process.env.JWT_REFRESH_SECRET);
	jwt.verify(
		refreshToken,
		process.env.JWT_REFRESH_SECRET!,
		(err: any, payload: any) => {
			if (err) {
				return res
					.status(401)
					.json({ message: "Invalid token", err: err.message });
			}
			// add another security level -> that check whether the user exist in database or not other wise just send 401 resposnse.
			const newAccessToken = generateAccessToken(
				payload.userId,
				payload.role
			)
			return res.status(200).json({ success: true, accessToken: newAccessToken});
		}
	);
});

router.post("/logout", (req: Request, res: Response) => {

	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true, // Set to true in production
		sameSite: "none",
		path: "/api/user/", // This endpoint only
	 });
	const cookie = req.cookies;
	const value = JSON.stringify(cookie);
	console.log('this is cookei', value)
	res.json({ success: true, message: "Logged out successfully" });
});

export default router;
