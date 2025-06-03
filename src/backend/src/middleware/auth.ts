import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface CustomRequestObject extends Request {
	userAuthorized: boolean;
	userId: string;
	role: string;
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers["authorization"];
		const token =
			authHeader && authHeader.startsWith("Bearer ")
				? authHeader.split(" ")[1]
				: null;

		if (!token) {
			(req as CustomRequestObject).userAuthorized = false;
			return next();
		}

		// Verify the token
		jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err, payload) => {
			if (err) {
				// Handle token verification errors
				console.log("this is token error: ", err.message);
				return res
					.status(403)
					.json({ message: "Invalid token", err: err.message });
			}

			// If the token is valid, set the user information in the request object
			(req as CustomRequestObject).userAuthorized = true;
			(req as CustomRequestObject).userId = (payload as any).userId; // Cast payload to any to access userId
			(req as CustomRequestObject).role = (payload as any).role; // Cast payload to any to access role
			return next();
		});
	} catch (error: any) {
		return res.status(500).json({ message: (error as Error).message });
	}
};

// Function to generate tokens
export const generateAccessToken = (userId: string, role: string) => {
	return jwt.sign(
		{ userId: userId, role: role },
		process.env.JWT_ACCESS_SECRET!,
		{ expiresIn: "30m" }
	);
};

export const generateRefreshToken = (userId: string, role: string) => {
	console.log("refrehs key ", process.env.JWT_REFRESH_SECRET);

	return jwt.sign(
		{ userId: userId, role: role },
		process.env.JWT_REFRESH_SECRET!,
		{ expiresIn: "7d" }
	);
};

export default auth;
