require("dotenv").config();
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import problemRoute from "./src/routes/problemRoute";
import adminRoute from "./src/routes/adminRoute";
import userRoute from "./src/routes/userRoute";
import auth from "./src/middleware/auth";
import prisma from "./src/db";
import submissionRoute from "./src/routes/submissionRoute";

const app = express();

// Allowed origins (use env in production with localhost fallback for dev)
const allowedOrigins = [
	process.env.FRONTEND_URL || "https://codeio-tawny.vercel.app",
	"http://localhost:5173",
];

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: allowedOrigins,
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// Health check route
app.get("/", (req: Request, res: Response) => {
	return res.json({ ok: true, message: "hello there!" });
});

// API routes
app.use("/api/problem", problemRoute);
app.use("/api/admin", auth, adminRoute);
app.use("/api/auth", userRoute);
app.use("/api/submission", submissionRoute);

// Connect Prisma once (Vercel will reuse)
async function connectDB() {
	try {
		await prisma.$connect();
		console.log("✅ Connected to database");
	} catch (err) {
		console.error("❌ Database connection failed:", err);
	}
}
connectDB();

// Export for Vercel serverless
export default app;
