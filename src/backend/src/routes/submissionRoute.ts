import { Request, Router, Response } from "express";
import axios from "axios";
const router = Router();
import auth, { CustomRequestObject } from "../middleware/auth";
import {
	getFullTemplateCode,
	getSampleTestcases,
	getUserSubmissions,
} from "../db/submission";
import {
	JUDGE0_INCLUDED_RESPONSE_FIELD,
	LNAGUAGE_MAPPING,
	PreparedSubmissionArray,
	PrepareSubmissionArrayProps,
	SubmissionsResult,
	TestcaseType,
} from "../@utils/types";


const JUDGE0_API_URL = process.env.JUDGE0_API_URL; // move into types.ts file
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // mmove into types.ts file

// GET ALL USER SUBMISSIONS
router.get("/get-submissions", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	if (!userAuthorized) {
		return res.status(404).json({
			success: false,
			msg: "UnAuthorized Access!!",
		});
	}

	try {
		const user_sumbissions = await getUserSubmissions(userId);
		return res.status(200).json({
			success: true,
			msg: "Successfully fetched all user submissions",
			data: user_sumbissions,
		});
	} catch (error: any) {
		console.log("SUBMISSION_ROUTE_ERROR: ", error.message);
	}
});

router.post("/run-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	if (!userAuthorized) {
		return res
			.status(401)
			.json({ success: false, msg: "UnAuthorized Access!!" });
	}
	const { problemId, language, code } = req.body.data;
	try {
		// get the sample testcases;
		const sampleTestcases = await getSampleTestcases(problemId);

		// get full template code
		const template = await getFullTemplateCode(problemId, language);

		if (!template) {
			return res
				.status(404)
				.json({ success: false, msg: "Template Code not found!!" });
		}
		// now run code for these testcases
		const languageId: number = LNAGUAGE_MAPPING[language].languageId;

		const response = await evaluateCode(
			sampleTestcases,
			template.full_template,
			languageId,
			code
		);
		if (!response.success && response.msg) {
			return res.status(500).json({ success: false, msg: response.msg });
		}

		// format the result.
        const formattedResult = formatExecutionResult (response.data);
		if (!formattedResult.success) {
			return res.status(404).json({ success: false, msg: formattedResult.msg});
		}

		return res.status(200).json({
			success: true,
			msg: "Evaluated successfully",
			data: {
				passed_testcases: formattedResult.passed_testcases,
				submissions: formattedResult.submissions
			}
		})
	} catch (error: any) {
		console.log("RUN_CODE_ROUTE_ERROR: ", error.message);
		return res.status(500).json({ success: false, msg: error });
	}
});

export async function evaluateCode(
	testcaseExamples: TestcaseType[],
	fullTemplate: string,
	languageId: number,
	code: string
): Promise<{ success: boolean; msg?: string; data?: SubmissionsResult[] }> {
	try {
		const submissionsArray = prepareSubmissionArray({
			testcases: testcaseExamples,
			fullTemplate,
			languageId,
			code,
		});

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
				fields: JUDGE0_INCLUDED_RESPONSE_FIELD,
			},
		};
		let submissionsResult: SubmissionsResult[] = [];
		while (true) {
			const response = await axios.request(getSubmissionsOptions);
			const { submissions } = response.data;
			submissionsResult = submissions;

			const stillProcessing = submissions.some(
				(sub: SubmissionsResult) => sub.status.id <= 2
			);
			if (!stillProcessing) break;

			// wait for 1 second and then get the result of submissions
			await new Promise((resolve) => setTimeout(resolve, 2000));
		}

		return {
			success: true,
			data: submissionsResult as SubmissionsResult[],
		};
	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return {
			success: false,
			msg: error.message,
		};
	}
}

function prepareSubmissionArray({
	testcases,
	languageId,
	fullTemplate,
	code,
}: PrepareSubmissionArrayProps): PreparedSubmissionArray[] {
	const submissionsArray: PreparedSubmissionArray[] = testcases.map(
		(testcase: TestcaseType) => {
			return {
				language_id: languageId,
				source_code: fullTemplate.replace("__USER_CODE_HERE__", code),
				stdin: testcase.input,
				expected_output: testcase.expected_output,
			};
		}
	);

	return submissionsArray;
}

function formatExecutionResult (result: SubmissionsResult[] | undefined) {
	if (result == undefined) {
		return {
			success: false,
			msg: "Result not found!!"
		}
	}
	let passed_testcases: number = 0;
	
	const formattedResult = result.map(res => {
		if (res.status.description == "Accepted") passed_testcases++;
		return {
			input: res.stdin,
			user_output: res.stdout,
			expected_output: res.exptected_output,
			status: res.status.description,
			compile_output: res.compile_output
		}
	})

	return {
		success: true,
		passed_testcases,
		submissions: formattedResult
	};

}



// router.post("/submit-code", auth, async (req: Request, res: Response) => {
// 	const { userAuthorized } = req as CustomRequestObject;

// 	try {
// 		if (!userAuthorized) {
// 			return res.status(401).json({
// 				suceess: false,
// 				message: "Unauthorized!, Please login",
// 			});
// 		}
// 		const { userId } = req as CustomRequestObject;
// const parseUserSubmitCode = ProblemSubmissionDataSchema.safeParse(
// 	req.body.data
// );
// 		if (!parseUserSubmitCode.success) {
// 			return res
// 				.status(400)
// 				.json({ success: false, message: parseUserSubmitCode.error });
// 		}
// 		const { problemTitle, languageId, code } = parseUserSubmitCode.data;

// 		// get the problem to extract the problem id
// 		const problem = await prisma.problem.findUnique({
// 			where: {
// 				title: problemTitle,
// 			},
// 			select: {
// 				id: true,
// 			},
// 		});

// 		if (!problem)
// 			return res.status(400).json({
// 				success: false,
// 				message: "No Problem exist with title",
// 			});

// 		// get all testcases.
// 		const testcases = await getAllTestcases(problem.id);

// 		if (testcases.data === undefined || !testcases.success) {
// 			return res.status(500).json({
// 				success: false,
// 				message:
// 					testcases?.err || "Error occured while fetching testcases",
// 			});
// 		}

// 		// evaluate the user code.
// 		const result = await evaluateCode(testcases.data, languageId, code);

// 		if (!result?.success) {
// 			return res.status(400).json({ success: false, error: result?.msg });
// 		}
// 		/*
// 			- need to find the overall status of submission.
// 			- if all testcase are passed:
// 				- update the problem staus on user as  Accpeted.
// 				- append first three testcases to submission array
// 				- and send the submission array back to frontend.
// 			- else
// 				- update the problem status on user as Attempted.
// 				- append the first three rejected testcases to submission array
// 				- and send the submission array back to frontend.
// 			-
// 		*/
// 		const { data } = result;
// 		const examineResult = examineSubmissionResult(data, testcases.data);

// 		// update the problem status on user
// 		const status =
// 			examineResult.overAllStatus === "Accepted" ? "Solved" : "Attempted";
// 		await updateProblemStatusOnUser(userId, problem.id, status);

// 		// save user submission in database.
// 		await createSubmission({
// 			userId,
// 			languageId,
// 			problemId: problem.id,
// 			code,
// 			time: data[1].time ? data[1].time : "N/A",
// 			memory: data[1].memory ? `${data[1].memory}` : "N/A",
// 			status: examineResult.overAllStatus,
// 		});

// 		// send the submission result to user.
// 		return res.status(200).json({
// 			success: true,
// 			message: "Your submission saved successfullly",
// 			data: {
// 				overallStatus: examineResult.overAllStatus,
// 				passed_testcases: examineResult.no_of_accepted_testcases,
// 				submissions: examineResult.submissions,
// 			},
// 		});
// 		// store the user submission in databases if accepted { problemId, userId, submission status, code}
// 	} catch (error: any) {
// 		console.log("SUBMIT_CODE", error.message);
// 		return res.json({
// 			success: false,
// 			message: (error as Error).message,
// 		});
// 	}
// });

// export asyn

// function examineSubmissionResult(
// 	data: SubmissionsResult[],
// 	testcases: TestCaseReturnType[]
// ) {
// 	// need to find the overallStatus
// 	// need to find the first three accepeted/rejected testcases based on overallStaus
// 	let no_of_accepted_testcases = 0;
// 	let overAllStatus = "";
// 	let submissions: Modifiedsubmission[] = [];

// 	for (let i = 0; i < data.length; i++) {
// 		if (data[i].status.description === "Accepted") {
// 			no_of_accepted_testcases++;
// 		}
// 		if (data[i].status.description === "Compilation Error") {
// 			overAllStatus = "Compilation Error";
// 			break;
// 		} else if (data[i].status.description === "Wrong Answer") {
// 			if (submissions.length < 1) {
// 				// put only first reject submission

// 				const formattedSubmission = {
// 					...data[i],
// 					inputs: testcases[i].inputs,
// 				};

// 				submissions.push(formattedSubmission);
// 			}
// 			overAllStatus = "Wrong Answer";
// 		} else if (data[i].status.description === "Time Limit Exceeded") {
// 			if (submissions.length < 1) {
// 				// put only first reject submission

// 				const formattedSubmission = {
// 					...data[i],
// 					inputs: testcases[i].inputs,
// 				};
// 				submissions.push(formattedSubmission);
// 			}
// 			overAllStatus = "Time Limit Exceeded";
// 		}
// 	}

// 	if (no_of_accepted_testcases === data.length) {
// 		overAllStatus = "Accepted";

// 		const end = testcases.length > 2 ? 3 : testcases.length;
// 		for (let i = 0; i < end; i++) {
// 			submissions.push({
// 				...data[i],
// 				inputs: testcases[i].inputs,
// 			});
// 		}
// 	}
// 	return {
// 		overAllStatus,
// 		submissions,
// 		no_of_accepted_testcases,
// 	};
// }

export default router;
