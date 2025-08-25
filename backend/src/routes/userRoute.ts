import express, { Request, Response } from "express";
import prisma from "../db";
import { CustomRequestObject } from "../middleware/auth";

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

export default router;
