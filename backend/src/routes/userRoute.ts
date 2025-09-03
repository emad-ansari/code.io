import express, { Request, Response } from "express";
import prisma from "../db";
import { CustomRequestObject } from "../middleware/auth";
import { getUserProfile } from "../db/user";

const router = express.Router();

router.get("/get-user-details", async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;
	console.log("request received for user details");
	if (!userAuthorized) {
		return res.status(401).json({ success: false, msg: "Unauthorized" });
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				username: true,
			},
		});
		return res.json({
			success: true,
			data: user,
			msg: "User details fetched successfully",
		});
	} catch (error) {
		console.error("Error fetching user details:", error);
		return res
			.status(500)
			.json({ success: false, msg: "Internal server error" });
	}
});

router.get('/profile', async(req: Request, res: Response) => {
	const {userAuthorized, userId} = req as CustomRequestObject;
	if (!userAuthorized) {
		return res.status(401).json({
			success: false,
			msg: "Unauthorized Access!"
		})
	}
	try {
		const userProfile = await getUserProfile(userId);
		return res.status(200).json({
			success: true,
			msg: "Profile Fetched Successfully",
			data: userProfile
		})
	}
	catch(error: any) {
		console.log("GET_USER_PROFILE_ROUTE_ERROR: ", error);
		return res.status(500).json({
			success: false,
			msg: error
		})
	}
})

export default router;
