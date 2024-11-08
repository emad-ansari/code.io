import { Request, Router, Response } from "express";
const router = Router();
import axios from "axios";

import prisma from "../db";
import { getAllTestcases } from "../db/testcase";
import { getTestCaseExample } from "../db/problem";
import auth, { CustomRequestObject } from "../middleware/auth";
import { Modifiedsubmission, ProblemSubmissionDataSchema, SubmissionsResult, TestCaseReturnType } from "../@utils/types";
import { GenerateFullProblemDefinition } from "../lib/generateFullProblemDefinition";

const JUDGE0_API_URL = process.env.JUDGE0_API_URL; // move into types.ts file
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // mmove into types.ts file

router.post("/submit-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

	try {
		if (!userAuthorized) {
			return res
				.status(401)
				.json({ message: "your are not authorized, please login" });
		}
		const parseUserSubmitCode = ProblemSubmissionDataSchema.safeParse(
			req.body
		);
		if (!parseUserSubmitCode.success) {
			return res.status(401).json({ error: parseUserSubmitCode.error });
		}
		const { problemTitle, languageId, code } = parseUserSubmitCode.data;
		const problem = await prisma.problem.findUnique({
			where: {
				title: problemTitle
			},
			select: {
				id: true
			}
		})
		if (!problem) return res.json({
			success: false,
			message: "No Problem exist with title"
		})

		const testcases = await getAllTestcases(problem.id);

		if (testcases.data === undefined || !testcases.success) {
			return res.status(500).json({
				error:
					testcases?.err || "Error occured while fetching testcases",
			});
		}
		// 3. create submission array
		const result = await evaluateCode(testcases.data, languageId, code);
		if (!result?.success) {
			return res.status(400).json({ error: result?.msg });
		}

		//  save the user submission with {userId, problemId, code, languageId, time, memory, status }
		// one user can have more than one submissons
		// update the ProblemStaus { Attempted: if submit code and it failed, Sovled: if user paased all testcases}

		return res.status(200).json({
			type: "success",
			message: "Your submissions has been accepted",
		});
		// store the user submission in databases if accepted { problemId, userId, submission status, code}
	} catch (error: any) {}
});

router.get('/get-submissions', async() => {

})

router.post("/run-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const parseUserSubmitCode = ProblemSubmissionDataSchema.safeParse(
		req.body.data
	);
	if (!parseUserSubmitCode.success) {
		return res.json({ error: parseUserSubmitCode.error });
	}

	try {
		if (!userAuthorized) {
			return res
				.status(400)
				.json({ success: false,  message: "your are not authorized, please login" });
		}

		const { problemTitle, languageId, code } = parseUserSubmitCode.data;
		const problem = await prisma.problem.findUnique({
			where: {
				title: problemTitle
			},
			select: {
				id: true
			}
		})
		if (!problem) return res.json({
			success: false,
			message: "Problem with title not found"
		})
		console.log('control reaches here...');

		// here get the first three testcases and run it on jude0
		const testcaseExamples = await getTestCaseExample(problem.id);
		// run these testcase exmaples
		if (testcaseExamples !== undefined) {
			// evaluate the code
			const result = await evaluateCode(
				testcaseExamples,
				languageId,
				code
			);
			if (!result?.success) {
				return res.status(200).json({ err: result?.msg });
			}
			// add the input array to submision array to render the testcase value on frontend
			const submissions: Modifiedsubmission[] = result.data.map(
				(v: SubmissionsResult, i) => ({
					...v,
					inputs: testcaseExamples[i].inputs,
				})
			);
			let passed_testcases = 0;
			const { data } = result;

			let resultStatus = "";
			data.forEach((v) => {
				if (v.status.description === "Accepted") passed_testcases++;
				else if (v.status.description === "Compilation Error") {
					resultStatus = "Compilation Error";
				} else if (v.status.description === "Wrong Answer") {
					resultStatus = "Wrong Answer";
				} else if (v.status.description === "Time Limit exceeded") {
					resultStatus = "Time Limit exceeded";
				}
			});
			if (passed_testcases === data.length) resultStatus = "Accepted";

			return res.status(200).json({
				success: true,
				data: {
					overallStatus: resultStatus,
					passed_testcases: passed_testcases,
					submissions: submissions,
				},
				message: "code evaluated successfully",
			});
		}
	} catch (error: any) {
		console.log(error);
		return res.json({
			success: false,
			message: (error as Error).message,
		});
	}
});

export async function evaluateCode(
	testcaseExamples: TestCaseReturnType[],
	languageId: number,
	code: string
): Promise<{ success: boolean; msg: any; data: SubmissionsResult[] }> {
	try {
		const submissionsArray: {
			language_id: number;
			source_code: string;
			stdin: string;
			expected_output: string;
		}[] = testcaseExamples.map((testcase: TestCaseReturnType) => {
			const parser = new GenerateFullProblemDefinition();
			parser.parseTestCase(testcase);
			//getProblem() --> { fullBoilerplate code, stdin, stdout, }
			const problem = parser.getProblem(languageId, code);

			return {
				language_id: languageId, // Java ID for Judge0
				source_code: problem.fullBoilerplatecode,
				stdin: problem.stdin,
				expected_output: problem.stdout,
			};
		});
		console.log('submission array :',  submissionsArray);


		const CreateSubmissionsOptions = {
			method: "POST",
			url: JUDGE0_API_URL,
			headers: {
				"Content-Type": "application/json",
				"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
				"x-rapidapi-key": JUDGE0_API_KEY,
			},
			data: {
				submissions: submissionsArray,
			},
		};
		

		const response = await axios.request(CreateSubmissionsOptions);
		console.log('submission token response: ', response);
		const getSubmissionsOptions = {
			method: "GET",
			url: JUDGE0_API_URL,
			headers: {
				"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
				"x-rapidapi-key": JUDGE0_API_KEY,
			},
			params: {
				tokens: `${response.data
					.map((token: { token: string }) => token.token)
					.join(",")}`,
				base64_encoded: "false",
				fields: "language_id,stdin,stdout,expected_output,time,memory,stderr,compile_output,message,status,status_id,source_code",
			},
		};
		// wait for 1 second and then get the result of submissions
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const result = await axios.request(getSubmissionsOptions);
		const { submissions } = result.data;
		console.log('submission result: ', submissions);

		return {
			success: true,
			data: submissions as SubmissionsResult[],
			msg: "",
		};
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return {
			success: false,
			msg: error.message,
			data: [],
		};
	}
}



export default router;
