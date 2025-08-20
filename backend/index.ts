require("dotenv").config();
import express, { Request, Response } from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";
const PORT = process.env.PORT || 3000;

import problemRoute from "./src/routes/problemRoute";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import auth from "./src/middleware/auth";
import prisma from "./src/db";
import submissionRoute from "./src/routes/submissionRoute";

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]; // Add your frontend URL here

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: allowedOrigins,
		credentials: true, // Allow credentials (cookies, headers, etc.) to be sent
	})
);

app.get("/", (req: Request, res: Response) => {
	return res.json("hello there!");
});

app.use("/api/problem", problemRoute);
app.use("/api/admin", auth, adminRoute);
app.use("/api/auth", userRoute);
app.use("/api/submission", submissionRoute);

async function startServer() {
	try {
		await prisma.$connect();
		console.log("✅ Connected to database");

		app.listen(PORT, () => {
			console.log(`🚀 Server running on http://localhost:${PORT}`);
		});

		// gracefulShutdown(); // handle SIGINT
	} catch (err) {
		console.error("❌ Database connection failed:", err);
		process.exit(1);
	}
}

startServer();
