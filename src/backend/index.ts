require("dotenv").config();
import express, {Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;
import problemRoute from "./src/routes/problemRoute";
import contributionRoute from './src/routes/contributionRoute';
import adminRoute from './src/routes/adminRoute'
import userRoute from './src/routes/userRoute';


import cors from "cors";



app.use(cors());
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
