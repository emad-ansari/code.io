import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import { z } from "zod";
import auth from "../middleware/auth";
import { CustomRequestObject } from "../middleware/auth";
import { ParseProblemDetails } from "../lib/index";
import { createProblem } from "../db/problem";
import { createTestCases } from "../db/testcase";



export const SingleTestCase = z.object({
	inputs: z.array(
		z.object({
			name: z.string(),
			type: z.string(),
			value: z.string(),
		})
	),
	output: z.object({
		type: z.string(),
		value: z.string(),
	}),
})

export const TestCaseFormat = z.array(SingleTestCase)



const ParameterFormat = z.array(
	z.object({
		parameterId: z.string(),
		type: z.string(),
		name: z.string(),
	})
)
export const NewProblemInput = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	returnType: z.string(),
	parameters: ParameterFormat,
	testcases: TestCaseFormat
});

export const NewTestCaseFormat = z.object({
	testcaseId: z.string(),
	problemTitle: z.string(),
	testcases: TestCaseFormat
});

// ensure the problem title must be unique when creating a new problem

router.post("/problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	try {
		// if (userAuthorized) {
		const parsedInput = NewProblemInput.safeParse(req.body);
		if (parsedInput.success) {
			const { title } = parsedInput.data;

			const filePath = `src/contribution/newproblem/${title.replace(
				/\s+/g,
				"_"
			)}.json`;

			// attach user id to problem to identify which user create this problem
			const problemInfo = { ...parsedInput.data, userId };

			const jsonString = JSON.stringify(problemInfo, null, 2);

			fs.writeFile(filePath, jsonString, (err) => {
				if (err) {
					console.log("Error writing file", err);
					return res.status(500).json({err: "server is not able to save you problem please try again!!"});

				} else {
					console.log("Successfully wrote file");
					return res.status(200).json({ msg: "Problem has been saved for review, thank for contribution!"});
				}
			});

			/*
				- user might click multiples time to send data, so also implement reate limit here.
				- dynamiclly create a new file in problem folder 
				- then save new problem into file temporary

			*/
		} else {
			return res.status(400).json({ error: parsedInput.error });
		}
		// }
		// else {
		// 	return res.status(401).json({ error: "You  are not Authorize!! please login" });
		// }
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return res.status(400).json({ error: "Not able to create problem!!" });
	}
});

router.post("/testcase", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	try {
		if (!userAuthorized) {
			return res
				.status(401)
				.json({ error: "You are not authorize please login" });
		}
		const parsedTestcaseInput = NewTestCaseFormat.safeParse(req.body);
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
						error: "Not able to save the problem please try after some time",
					});
				} else {
					// [Todo] - send an email to user as a response
					return res.status(200).json({
						message:
							"Your testcase has been saved for review, thankyou for contribution",
					});
				}
			});
		} else {
			return res.status(400).json({ error: parsedTestcaseInput.error });
		}
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
});


export default router;
