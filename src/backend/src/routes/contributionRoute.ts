import { Request, Response, Router } from "express";
const router = Router();
import * as fs from "fs";
import { z } from "zod";
import auth from "../middleware/auth";
import { CustomRequestObject } from "../middleware/auth";
import { ParseProblemDetails } from "../lib/index";
import { createProblem } from "../db/problem";
import { createTestCases } from "../db/testcase";


const TestCaseFormat = z.array(
	z.object({
		testcaseId: z.string(),
		inputs: z.array(
			z.object({
				inputId: z.string(),
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
)

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

const NewTestCaseInput = z.object({
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
		const parsedTestcaseInput = NewTestCaseInput.safeParse(req.body);
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

/*
	
	- first save the problem in database so that you can get the problem id (you can use setInterval which runs after every 12 hours)
	- write a function to trigger the boiler plate generate code after successfully reviewed
	- save all boiler plate code to database
	- need problemId, and language id
	- also save a new problem into Problem model/Table
	- set language id manual
	- after creating and saving the boiler plate code delete the temporary file
*/

async function saveProblem(filePath: string) {
	try {
		// 1.for above file path extract the problem info
		const parser = new ParseProblemDetails();
		const problem = parser.extractProblemDetails(filePath);
		// 3.make a database call to create a new problem and return the id.
		const newProblem = await createProblem(
			problem.title,
			problem.description,
			problem.difficulty,
			problem.userId
		);
		

		if (!newProblem.success) {
			console.log("Error: ", newProblem.msg);
			return; //  [Todo] - need to use concept of recursion that call atleas 3 times if there is problem in createing new problem or testcases
		}
		const java = parser.getJavaBoilerplateCode();
		const cpp = parser.getCppBoilerplateCode();
		const typescript = parser.getTypescriptBoilerplateCode();       


		// 4.make database call to create new testcases with the given problem id
		// const newTestCases = await createTestCases({
		// 	problemId: newProblem.id,
		// 	testcases: problem.testcases, // testcases array
		// });

		// if (!newTestCases.success) {
		// 	console.log("Error: ", newTestCases.msg);
		// 	return;
		// }

		// saveBoilerplateCode(newProblem.id);
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
	}
}
// const filePath = `src/contribution/newproblem/Two_Sum.json`;
// saveProblem(filePath);

async function saveBoilerplateCode(problemId: string) {
	// cosnt java = getJavaBoilerplatecode()
	// const cpp = getCppBoilerplateCode();
	// const javascript = getJavaScriptBoilerpalatecode();
	// const typescript = getTypescriptBoilerplatecode();
	// now save all the boiler code to defualtCode model [needed --> languageId, problemId]
	// how to get the langauge id? answer --> just hard code it for right now
}

export default router;
