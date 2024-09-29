import { Request, Router, Response, request } from "express";
const router = Router();
import axios from "axios";
import auth, { CustomRequestObject } from "../middleware/auth";
import { GenerateFullProblemDefinition } from "../lib/generateFullProblemDefinition";
import { getAllTestcases } from "../db/testcase";
import {
	ProblemSubmissionData,
	TestCaseReturnType,
	Problem,
} from "../@utils/types";
import {
	getProblemDetailWithStatus,
	getProblemDetailWithoutStatus,
	getProblemsWithStatus,
	getProblemsWithoutStatus,
	getTestCaseExample,
} from "../db/problem";
import prisma from "../db";
import { date } from "zod";

const JUDGE0_CALLBACK_URL = process.env.JUDGE0_CALLBACK_URL;

router.get("/filter-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	console.log("control reaches here...");
	const query = req.query;
	const pageNumber = Number(query.pageNumber);
	const pageSize = Number(query.pageSize);
	const difficulty = String(query.difficulty);
	const status = String(query.status);

	try {
		const startIndex = (pageNumber - 1) * pageSize;
		if (userAuthorized) {
			const { userId } = req as CustomRequestObject;
			const problemsWithStatus = await getProblemsWithStatus(userId);
			if (!problemsWithStatus.success) {
				return res.json({
					err: "something went wrong while quering to database",
				});
			}

			let problems: Problem[] = problemsWithStatus.problems;

			if (difficulty !== "" && status !== "") {
				// means there is  difficulty and status query just so filter based on that
				problems = problems.filter(
					(p) =>
						p.problem.difficulty === difficulty &&
						p.status === status
				);
			} else if (difficulty !== "" && status === "") {
				// means there is  no status but difficulty
				problems = problems.filter(
					(p) => p.problem.difficulty === difficulty
				);
			} else if (difficulty === "" && status !== "") {
				problems = problems.filter((p) => p.status === status);
			}

			const endIndex = Math.min(pageNumber * pageSize, problems.length);
			const problemSet = problems.slice(startIndex, endIndex);
			const totalPages = Math.ceil(problems.length / pageSize);
			return res.status(200).json({
				message: "success",
				data: problemSet,
				totalPages,
			});
		} else {
			// just send the problem without Problem status because user is not authorized
			const problemWithoutStatus = await getProblemsWithoutStatus();
			if (!problemWithoutStatus.success) {
				return res.json({ err: "check cehck...." });
			}
			const endIndex = Math.min(
				pageNumber * pageSize,
				problemWithoutStatus.problems.length
			);
			const problemSet = problemWithoutStatus.problems.slice(
				startIndex,
				endIndex
			);
			const totalPages = Math.ceil(
				problemWithoutStatus.problems.length / pageSize
			);
			return res.status(200).json({
				message: "success",
				data: problemSet,
				totalPages,
			});
		}
	} catch (error: any) {
		console.error("Error during getting problme: ", error.message);
	}
});

const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY;

router.post("/submit-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

	try {
		if (!userAuthorized) {
			return res
				.status(400)
				.json({ message: "your are not authorized, please login" });
		}
		const parseUserSubmitCode = ProblemSubmissionData.safeParse(req.body);
		if (!parseUserSubmitCode.success) {
			return res.status(401).json({ error: parseUserSubmitCode.error });
		}
		const { problemId, languageId, code } = parseUserSubmitCode.data;

		const testcases = await getAllTestcases(problemId);

		if (testcases.data === undefined || !testcases.success) {
			return res.status(500).json({
				error:
					testcases?.err || "Error occured while fetching testcases",
			});
		}
		// 3. create submission array
		const result = await evaluateCode(testcases.data, languageId, code);
		if (!result?.success){
			return res.status(400).json({ error: result?.msg});
		}
		
		//  save the user submission with {userId, problemId, code, languageId, time, memory, status }
		// one user can have more than one submissons
		// update the ProblemStaus { Attempted: if user run code, Sovled: if user paased all testcases}


		return res.status(200).json({
			type: "success",
			message: "Your submissions has been accepted",
		});
		// store the user submission in databases if accepted { problemId, userId, submission status, code}
	} catch (error: any) {}
});

router.post("/evaluate-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const parseUserSubmitCode = ProblemSubmissionData.safeParse(
		req.body.data
	);
	if (!parseUserSubmitCode.success) {
		return res.status(401).json({ error: parseUserSubmitCode.error });
	}


	try {
		if (!userAuthorized) {
			return res
				.status(400)
				.json({ message: "your are not authorized, please login" });
		}

		
		const { problemId, languageId, code } = parseUserSubmitCode.data;
		// here get the first three testcases and run it on jude0
		const testcaseExamples = await getTestCaseExample(problemId);
		// run these testcase exmaples
		if (testcaseExamples !== undefined){
			// evaluate the code
			const result = await evaluateCode(testcaseExamples, languageId, code);
			if (!result?.success){
				return res.status(200).json({ err: result?.msg})
			}
			// add the input array to submision array to render the testcase value on frontend
			const submissions: Modifiedsubmission[] = result.data.map((v: SubmissionsResult, i) => ({...v, inputs: testcaseExamples[i].inputs}))
			let passed_testcases = 0;
			const { data } = result;
			let resultStatus = "";
			data.forEach(v => {
				if (v.status.description === "Accepted") passed_testcases++;
				else if (v.status.description === "Compilation Error"){
					resultStatus = "Compilation Error";
				} 
				else if (v.status.description === "Wrong Answer"){
					resultStatus = "Wrong Answer";
				}
				else if (v.status.description === "Time Limit exceeded"){
					resultStatus = "Time Limit exceeded";
				}
			})

			return res.status(200).json({ 
				success: true,
				data: {
					overallStatus: resultStatus,  
					passed_testcases: passed_testcases,
					submissions: submissions ,
				},
				message: "code evaluated successfully"
			})
		}
		
	} catch (error: any) {
		console.log(error);
		return res.json({
			success: false,
			message: (error as Error).message 
		});
	}
});

interface Modifiedsubmission extends SubmissionsResult{
	inputs: {
		type: string;
		name: string;
		value: string;
	}[]
}

// router.post('/judge0-callback', async(req: Request, res: Response) => {
// 	try {
// 		const payload = req.body; // Parse the JSON payload sent by Judge0
// 		console.log('Judge0 callback received:', payload);
// 	}
// 	catch(error: any){
// 		console.error('Error handling Judge0 callback:', error);
// 		res.status(500).send('Internal Server Error'); // Handle error appropriately
// 	}

// })

// when you are going to submit the code
interface SubmissionsResult {
	languageId: number;
	time?: string;
	memory?: number;
	status: {
		id: number;
		description: string;
	};
	stdin: string;
	stdout: string; // user output
	exptected_output: string;
	compile_output: string | null;
	source_code?: string
}

router.get(
	"/get-problem-details/:problemId",
	auth,
	async (req: Request, res: Response) => {
		const { problemId } = req.params;

		const { userAuthorized } = req as CustomRequestObject;
		if (problemId === undefined) {
			return;
		}

		try {
			if (userAuthorized) {
				// send with problem status
				const { userId } = req as CustomRequestObject;
				const result = await getProblemDetailWithStatus(
					userId,
					problemId
				);
				if (!result.success) {
					return res.json({ message: "error", err: result.msg });
				}
				return res.json({
					message: "success",
					problemDetails: result.problemDetail,
				});
			} else {
				// send with empty status if user is not authorized
				const result = await getProblemDetailWithoutStatus(problemId);
				if (!result.success) {
					return res.json({ message: "error", err: result.msg });
				}
				return res.json({
					message: "success",
					problemDetails: result.problemDetail,
				});
			}
		} catch (error: any) {
			console.log(error.message);
			return res.json({ message: error.message });
		}
	}
);

router.get("/default-code", async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const problemId = String(query.problemId);
		const langId = Number(query.languageId);

		const result = await prisma.defaultCode.findFirst({
			where: {
				problemId,
				languageId: langId,
			},
			select: {
				code: true,
			},
		});
		return res.json({ message: "success", defaultCode: result?.code });
	} catch (error: any) {
		console.log(error);
		return res.json({ message: "error" });
	}
});

async function evaluateCode(
	testcaseExamples: TestCaseReturnType[],
	languageId: number,
	code: string
): Promise<{success: boolean, msg: any, data: SubmissionsResult[]}> {
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
				fields: "language_id,stdin,stdout,expected_output,time,memory,stderr,compile_output,message,status,status_id,source_code",
			},
		};

		setTimeout(async () => {
			const result = await axios.request(getSubmissionsOptions);
			const { submissions } = result.data;
			console.log(result.data);
			return {
				success: true,
				data: submissions as SubmissionsResult[],
				msg: ""

			}
			
		}, 5000);
		return { // remove this return statement or remove the setTime out becaues this return statement will create unexpected behaviour
			success: false,
			msg: "",
			data: []
		}

	} catch (error: any) {
		console.error("Error: ", (error as Error).message);
		return {
			success: false,
			msg: error.message,
			data: []
		}
	}
}

export default router;

