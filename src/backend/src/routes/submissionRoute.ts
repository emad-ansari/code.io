import { Request, Router, Response } from "express";
const router = Router();
import auth, { CustomRequestObject } from "../middleware/auth";
import { getUserSubmissions } from "../db/submission";

// const JUDGE0_API_URL = process.env.JUDGE0_API_URL; // move into types.ts file
// const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // mmove into types.ts file


// GET ALL USER SUBMISSIONS
router.get("/get-submissions", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

    if (!userAuthorized) {
        return res.status(404).json({
            success: false ,
            msg: "UnAuthorized Access!!"
        })
    }

	try {
        const user_sumbissions = await getUserSubmissions(userId);
        return res.status(200).json({
            success: true,
            msg: "Successfully fetched all user submissions",
            data: user_sumbissions
        })
        
	} catch (error: any) {
		console.log("SUBMISSION_ROUTE_ERROR: ", error.message);
	}
});

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
// 		const parseUserSubmitCode = ProblemSubmissionDataSchema.safeParse(
// 			req.body.data
// 		);
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


// router.post("/run-code", auth, async (req: Request, res: Response) => {
// 	const { userAuthorized } = req as CustomRequestObject;
// 	const parseUserSubmitCode = ProblemSubmissionDataSchema.safeParse(
// 		req.body.data
// 	);
// 	if (!parseUserSubmitCode.success) {
// 		return res.json({ error: parseUserSubmitCode.error });
// 	}

// 	try {
// 		if (!userAuthorized) {
// 			return res.status(400).json({
// 				success: false,
// 				message: "your are not authorized, please login",
// 			});
// 		}

// 		const { problemTitle, languageId, code } = parseUserSubmitCode.data;
// 		const problem = await prisma.problem.findUnique({
// 			where: {
// 				title: problemTitle,
// 			},
// 			select: {
// 				id: true,
// 			},
// 		});
// 		if (!problem)
// 			return res.json({
// 				success: false,
// 				message: "Problem with title not found",
// 			});
		
// 		// here get the first three testcases and run it on jude0
// 		const testcaseExamples = await getTestCaseExample(problem.id);
// 		// run these testcase exmaples
// 		if (testcaseExamples !== undefined) {
// 			// evaluate the user code.
// 			const result = await evaluateCode(
// 				testcaseExamples,
// 				languageId,
// 				code
// 			);
// 			if (!result?.success) {
// 				return res.status(200).json({ err: result?.msg });
// 			}
// 			// add the input array to submision array to render the testcase value on frontend
// 			const submissions: Modifiedsubmission[] = result.data.map(
// 				(v: SubmissionsResult, i) => ({
// 					...v,
// 					inputs: testcaseExamples[i].inputs,
// 				})
// 			);

// 			const { data } = result;

// 			let passed_testcases = 0;
// 			let resultStatus = "";
// 			//  below logic is not correct  (if one testcase failed and another )
// 			data.forEach((v) => {
// 				if (v.status.description === "Accepted") passed_testcases++;
// 				else if (v.status.description === "Compilation Error") {
// 					resultStatus = "Compilation Error";
// 				} else if (v.status.description === "Wrong Answer") {
// 					resultStatus = "Wrong Answer";
// 				} else if (v.status.description === "Time Limit exceeded") {
// 					resultStatus = "Time Limit exceeded";
// 				}
// 			});
// 			if (passed_testcases === data.length) resultStatus = "Accepted";

// 			return res.status(200).json({
// 				success: true,
// 				data: {
// 					overallStatus: resultStatus,
// 					passed_testcases: passed_testcases,
// 					submissions: submissions,
// 				},
// 				message: "code evaluated successfully",
// 			});
// 		}
// 	} catch (error: any) {
// 		console.log(error);
// 		return res.json({
// 			success: false,
// 			message: (error as Error).message,
// 		});
// 	}
// });

// export async function evaluateCode(
// 	testcaseExamples: TestCaseReturnType[],
// 	languageId: number,
// 	code: string
// ): Promise<{ success: boolean; msg: any; data: SubmissionsResult[] }> {
// 	try {
// 		const submissionsArray: {
// 			language_id: number;
// 			source_code: string;
// 			stdin: string;
// 			expected_output: string;
// 		}[] = testcaseExamples.map((testcase: TestCaseReturnType) => {
// 			const parser = new GenerateFullProblemDefinition();
// 			parser.parseTestCase(testcase);
// 			//getProblem() --> { fullBoilerplate code, stdin, stdout, }
// 			const problem = parser.getProblem(languageId, code);

// 			return {
// 				language_id: languageId, // Java ID for Judge0
// 				source_code: problem.fullBoilerplatecode,
// 				stdin: problem.stdin,
// 				expected_output: problem.stdout,
// 			};
// 		});
// 		console.log("submission array :", submissionsArray);

// 		const CreateSubmissionsOptions = {
// 			method: "POST",
// 			url: JUDGE0_API_URL,
// 			headers: {
// 				"Content-Type": "application/json",
// 				"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
// 				"x-rapidapi-key": JUDGE0_API_KEY,
// 			},
// 			data: {
// 				submissions: submissionsArray,
// 			},
// 		};

// 		const response = await axios.request(CreateSubmissionsOptions);
		
// 		const getSubmissionsOptions = {
// 			method: "GET",
// 			url: JUDGE0_API_URL,
// 			headers: {
// 				"x-rapidapi-host": "judge0-ce.p.rapidapi.com",
// 				"x-rapidapi-key": JUDGE0_API_KEY,
// 			},
// 			params: {
// 				tokens: `${response.data
// 					.map((token: { token: string }) => token.token)
// 					.join(",")}`,
// 				base64_encoded: "false",
// 				fields: "language_id,stdin,stdout,expected_output,time,memory,stderr,compile_output,message,status,status_id,source_code",
// 			},
// 		};
// 		// wait for 1 second and then get the result of submissions
// 		await new Promise((resolve) => setTimeout(resolve, 1000));

// 		const result = await axios.request(getSubmissionsOptions);
// 		const { submissions } = result.data;
// 		console.log("submission result: ", submissions);

// 		return {
// 			success: true,
// 			data: submissions as SubmissionsResult[],
// 			msg: "",
// 		};
// 	} catch (error: any) {
// 		console.error("Error: ", (error as Error).message);
// 		return {
// 			success: false,
// 			msg: error.message,
// 			data: [],
// 		};
// 	}
// }

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
