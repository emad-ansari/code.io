require("dotenv").config();
import express, {Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
import problemRoute from "./src/routes/problemRoute";
import contributionRoute from './src/routes/contributionRoute';
import adminRoute from './src/routes/adminRoute'
import userRoute from './src/routes/userRoute';
import cors from "cors";
import cookieParser from 'cookie-parser';


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174']; // Add your frontend URL here

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // Allow credentials (cookies, headers, etc.) to be sent
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
	return res.json("hello there!");
});

app.use("/api/problem", problemRoute);
app.use("/api/contribute", contributionRoute);
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);

app.listen(port, () => {
	console.log("server is running on port ✅", port);
});
