import { Request, Router, Response } from "express";
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
	const { userAuthorized, userId } = req as CustomRequestObject;

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

		const submissions: {
			language_id: number;
			source_code: string;
			stdin: string;
			expected_output: string;
		}[] = testcases.data.map((testcase: TestCaseReturnType) => {
			// [Todo] - remove type any and add testcase actual type
			const parser = new GenerateFullProblemDefinition();
			parser.parseTestCase(testcase);
			//getProblem() --> { fullBoilerplate code, stdin, stdout, }
			const problem = parser.getProblem(languageId, code);

			return {
				language_id: languageId, // Java ID for Judge0
				source_code: problem.fullBoilerplatecode,
				stdin: problem.stdin,
				expected_output: JSON.stringify(problem.stdout),
			};
		});

		console.log("this is submission array: ", submissions);

		// 4. make api call
		const data = JSON.stringify(submissions);

		// const executionResult = submissionResult.data as SubmissionsResult[];
		// above reponse will return a submission array
		// const failedTestCases: SubmissionsResult[] = executionResult.filter(
		// 	(submission: SubmissionsResult) => {
		// 		return (
		// 			submission.status.description !== "Accepted" ||
		// 			submission.compile_output !== null
		// 		);
		// 	}
		// );
		// if (failedTestCases.length !== 0) {
		// 	// meanse all testcases not passed
		// 	return res.status(200).json({
		// 		data: failedTestCases,
		// 		type: "error",
		// 	});
		// }

		return res.status(200).json({
			type: "success",
			message: "Your submissions has been accepted",
		});
		// store the user submission in databases if accepted { problemId, userId, submission status, code}
	} catch (error: any) {}
});


router.post("/evaluate-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized } = req as CustomRequestObject;
	console.log("evalutation data: ", req.body.data, userAuthorized);
	try {
		if (!userAuthorized) {
			return res
				.status(400)
				.json({ message: "your are not authorized, please login" });
		}

		const parseUserSubmitCode = ProblemSubmissionData.safeParse(
			req.body.data
		);
		if (!parseUserSubmitCode.success) {
			return res.status(401).json({ error: parseUserSubmitCode.error });
		}
		const { problemId, languageId, code } = parseUserSubmitCode.data;
		// here get the first three testcases and run it on jude0
		const testcaseExamples = await getTestCaseExample(problemId);
		// run these testcase exmaples
		if (testcaseExamples !== undefined) {
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
			console.log("this is submission array: ", submissionsArray);

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
			console.log("create submission response: ", response.data);
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
				},
			};
			setTimeout(async () => {
				const result = await axios.request(getSubmissionsOptions);
				const { submissions } = result.data;
				const ans = submissions.map((submission: any) =>
					console.log(JSON.stringify(submission.status))
				);
				console.log(result.data);
				return res.status(200).json({ result: result.data });
			}, 5000);
		}
	} catch (error: any) {
		console.log(error);
		return res.json({ err: "error while running program" });
	}
});

interface CreateSubmissionApiReponse {
	token: string;
}

interface SubmissionsResult {
	time: string;
	memory: number;
	status: {
		id: number;
		description: string;
	};
	stdout: string;
	compile_output: string | null;
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

export default router;

/*
	
	Create multiple submissions at once
	- POST
	- https://judge0-ce.p.rapidapi.com/submissions/batch
	- body: {
		"submissions": [
			{		
				"language_id": 62,
				"source_code": "public class Main{public static void main(String[] args){System.out.println(40);}}"
			},
			{
				"language_id": 62,
				"source_code": "public class Main{public static void main(String[] args){System.out.println(20);}}"
			},
			{
				"language_id": 62,
				"source_code": "public class Main{public static void main(String[] args){System.out.println(30);}}"
			}  
		],

	} ,
	params: {
    	base64_encoded: 'false'
 	 },


	- Get multiple submissions at once.
	- https://judge0-ce.p.rapidapi.com/submissions/batch
	-params: {
		tokens: 'dce7bbc5-a8c9-4159-a28f-ac264e48c371,1ed737ca-ee34-454d-a06f-bbc73836473e,9670af73-519f-4136-869c-340086d406db',
		base64_encoded: 'true',
		fields: '*'
	},

*/
