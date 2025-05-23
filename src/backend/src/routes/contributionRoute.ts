import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import auth from "../middleware/auth";
import { CustomRequestObject } from "../middleware/auth";
import { NewTestCaseSchema, ProblemSchema } from "../@utils/types";


router.post("/create-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

	if (!userAuthorized){
		return res.status(401).json({ success: false, message: "Unauthorized!"})
	}
	const { userId } = req as CustomRequestObject;

	try {
		const parsedProblem = ProblemSchema.safeParse(req.body);
		if (parsedProblem.success) {
			const { title } = parsedProblem.data;

			const filePath = `src/contribution/newproblem/${title.replace(
				/\s+/g,
				"_"
			)}.json`;

			// attach user id to problem to identify which user create this problem
			const problemInfo = { ...parsedProblem.data, userId };
			console.log('new problem info, ', problemInfo)
			const jsonString = JSON.stringify(problemInfo, null, 2);

			fs.writeFile(filePath, jsonString, (err) => {
				if (err) {
					console.log("Error writing file", err);
					return res.status(500).json({success: false, message: "server is not able to save you problem please try again!!"});

				} else {
					console.log("Successfully wrote file");
					return res.status(201).json({ success: true, message: "Problem has been saved for review, thank for contribution!"});
				}
			});
		} else {
			return res.status(400).json({ success: false, message: parsedProblem.error });
		}
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return res.status(400).json({ success: false,  msessage: (error as Error).message });
	}
});

router.post("/testcase", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	if (!userAuthorized){
		return res.status(401).json({ success: false, message: "Unauthorized!!"})
	}
	const { userId } = req as CustomRequestObject;

	try {

		const parsedTestcaseInput = NewTestCaseSchema.safeParse(req.body);
		if (parsedTestcaseInput.success) {
			const { problemTitle } = parsedTestcaseInput.data;
			const filePath = `src/contribution/newtestcase/${problemTitle.replace(
				/\s+/g,
				"_"
			)}.json`;
			// attach user id to testcase to identify which user create this problem
			const testcaseInfo = { ...parsedTestcaseInput.data, userId };

			const testcaseString = JSON.stringify(testcaseInfo, null, 2);

			fs.writeFile(filePath, testcaseString, (err) => {
				if (err) {
					console.error("Error while writing testcase file:", err);
					return res.status(500).json({
						success: false, 
						message: "Not able to save the problem please try after some time",
					});
				} else {
					// [Todo] - send an email to user as a response
					return res.status(201).json({
						success: true,
						message:
							"Your testcase has been saved for review, thankyou for contribution",
					});
				}
			});
		} else {
			return res.status(400).json({ success: false,  message: parsedTestcaseInput.error });
		}
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return res.status(400).json({ success: false,  msessage: (error as Error).message });
	}
});


export default router;
