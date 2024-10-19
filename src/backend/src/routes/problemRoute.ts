import { Request, Router, Response } from "express";
const router = Router();
import axios from "axios";
import auth, { CustomRequestObject } from "../middleware/auth";
import { GenerateFullProblemDefinition } from "../lib/generateFullProblemDefinition";
import { getAllTestcases } from "../db/testcase";
import {
	ProblemSubmissionData,
	TestCaseReturnType,
	ProblemDetailWithStatusOnUser,
} from "../@utils/types";

import {
	getProblemDetail,
	getOneProblemStatusOnUser,
	getTestCaseExample,
	getAllProblems,
	getTotalPages,
} from "../db/problem";
import prisma from "../db";

router.get("/filter-problem", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;

	const page = Number(req.query.pageNumber) || 1;
	const problemPerPage = Number(req.query.pageSize);
	const difficulty = req.query.difficulty as string | undefined;
	const status = req.query.status as string | undefined;
	const searchKeywords = req.query.searchKeywords as string | undefined;

	

	try {
		const filterQuery: {
			difficulty?: string;
			status?: string;
			searchKeywords?: string;
		} = {};

		if (difficulty) filterQuery.difficulty = difficulty;
		if (status) filterQuery.status = status;
		if (searchKeywords) filterQuery.searchKeywords = searchKeywords;

		const problems = await getAllProblems(
			page,
			problemPerPage,
			filterQuery
		);

		const totalPages = await getTotalPages(problemPerPage, filterQuery);
		if (userAuthorized) {
			return res.status(200).json({
				success: true,
				message: "Filtered problems",
				data: problems,
				totalPages: totalPages,
			});
		} else {
			// if user is not authorize then remove the status property from problems
			const problemsWithoutStatus = problems?.map((p) => {
				return {
					id: p.id,
					title: p.title,
					problemNo: p.problemNo,
					difficulty: p.difficulty,
				};
			});
			return res.status(200).json({
				success: true,
				message: "filtered problem without status",
				data: problemsWithoutStatus,
				totalPages: totalPages,
			});
		}
	} catch (e: any) {
		console.error(e.message);
		return res.status(500).json({ success: false, message: e.message });
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
		if (!result?.success) {
			return res.status(400).json({ error: result?.msg });
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

router.post("/run-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	const parseUserSubmitCode = ProblemSubmissionData.safeParse(req.body.data);
	if (!parseUserSubmitCode.success) {
		return res.json({ error: parseUserSubmitCode.error });
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

interface Modifiedsubmission extends SubmissionsResult {
	inputs: {
		type: string;
		name: string;
		value: string;
	}[];
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
	source_code?: string;
	stderr?: null;
}

router.get(
	"/get-problem-details/:title",
	auth,
	async (req: Request, res: Response) => {
		const { title } = req.params;
		const { userAuthorized } = req as CustomRequestObject;
		try {
			// get the problem detail along with testcase examples
			const result = await getProblemDetail(title);
			if (!result.success || result.problemDetail == undefined) {
				return res.json({ success: false, message: result.msg });
			}

			if (userAuthorized) {
				const { userId } = req as CustomRequestObject;
				// find the staus of user regarding the problem
				const response = await getOneProblemStatusOnUser(
					userId,
					result.problemDetail.id
				);
				if (!response.success || response.status === undefined) {
					return res.json({ success: false, message: response.msg });
				}

				const problemDetailWithStatusOnUser: ProblemDetailWithStatusOnUser =
					{
						...result.problemDetail,
						problemStatus: { status: response.status },
					};

				return res.json({
					success: true,
					message: result.msg,
					problemDetails: problemDetailWithStatusOnUser,
				});
			} else {
				// if user is not authorized then only send the problemDetail to guest user

				return res.json({
					success: true,
					message: result.msg,
					problemDetails: result.problemDetail,
				});
			}
		} catch (error: any) {
			console.log(error.message);
			return res.json({ success: false, message: error.message });
		}
	}
);

router.get("/default-code", async (req: Request, res: Response) => {
	try {
		const query = req.query;
		const problemTitle = String(query.problemTitle);
		const langId = Number(query.languageId);

		const problem = await prisma.problem.findFirst({
			where: {
				title: problemTitle,
			},
			select: {
				id: true,
				title: true,
			},
		});
		if (problem && problem.title === problemTitle) {
			const result = await prisma.defaultCode.findFirst({
				where: {
					problemId: problem.id ,
					languageId: langId,
				},
				select: {
					code: true,
				},
			});
			return res.json({ success: true, message: "success", defaultCode: result?.code });
		}
		return res.status(204).json({ success: false, message:  "problem not found" });
	} catch (error: any) {
		console.log(error);
		return res.json({ success: false, message: "error" });
	}
});

async function evaluateCode(
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
		// wait for 1 second and then get the result of submissions
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const result = await axios.request(getSubmissionsOptions);
		const { submissions } = result.data;
		
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
