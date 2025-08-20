import { Request, Router, Response } from "express";
import axios from "axios";
const router = Router();
import auth, { CustomRequestObject } from "../middleware/auth";
import {
	getAllTestcases,
	getFullTemplateCode,
	getSampleTestcases,
	getUserSubmissions,
	saveProgress,
	saveUserSubmissionDetails,
} from "../db/submission";
import {
	FormattedSubmissionType,
	JUDGE0_INCLUDED_RESPONSE_FIELD,
	LANGUAGE_MAPPING,
	PreparedSubmissionArray,
	PrepareSubmissionArrayProps,
	SubmissionsResult,
	TestcaseType,
} from "../@utils/types";
import { PassThrough } from "stream";

const JUDGE0_API_URL = process.env.JUDGE0_API_URL; // move into types.ts file
const JUDGE0_API_KEY = process.env.JUDGE0_API_KEY; // mmove into types.ts file

// get all user submissions.
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

// run user code
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
		const languageId: number = LANGUAGE_MAPPING[language].languageId;

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
		const formattedResult = formatExecutionResult(response.data);
		if (!formattedResult.success) {
			return res
				.status(404)
				.json({ success: false, msg: formattedResult.msg });
		}

		return res.status(200).json({
			success: true,
			msg: "Evaluated successfully",
			data: {
				passed_testcases: formattedResult.passed_testcases,
				submissions: formattedResult.submissions,
			},
		});
	} catch (error: any) {
		console.log("RUN_CODE_ROUTE_ERROR: ", error.message);
		return res.status(500).json({ success: false, msg: error });
	}
});

// submit user code.
router.post("/submit-code", auth, async (req: Request, res: Response) => {
	const { userAuthorized, userId } = req as CustomRequestObject;

	const { problemId, language, code } = req.body.data;

	if (!userAuthorized) {
		return res.status(401).json({
			suceess: false,
			message: "Unauthorized!, Please login",
		});
	}
	try {
		const testcases = await getAllTestcases(problemId);
		// get full template code
		const template = await getFullTemplateCode(problemId, language);

		if (!template) {
			return res
				.status(404)
				.json({ success: false, msg: "Template Code not found!!" });
		}
		// now run code for these testcases
		const languageId: number = LANGUAGE_MAPPING[language].languageId;

		const response = await evaluateCode(
			testcases,
			template.full_template,
			languageId,
			code
		);
		if (!response.success && response.msg) {
			return res.status(500).json({ success: false, msg: response.msg });
		}

		// format the result.
		const formattedResult = formatExecutionResult(response.data);
		if (!formattedResult.success) {
			return res
				.status(404)
				.json({ success: false, msg: formattedResult.msg });
		}

		let finalResult: FormattedSubmissionType[] = [];
		let overAllStatus = "Accepted";
		if (formattedResult.submissions) {
			for (let sub of formattedResult.submissions) {
				if (sub.status != "Accepted") {
					finalResult.push(sub);
					overAllStatus = sub.status;
					break;
				}
			}
		}
		// [Check]: before sending response first save the user submission detail
		await saveUserSubmissionDetails({
			userId,
			problemId,
			language,
			code,
			status: overAllStatus,
			time: (response.data && response.data[0].time) || "N/A",
			memory: (response.data && response.data[0].memory) || 0,
		});

		if (finalResult.length != 0) {
			return res.status(200).json({
				success: true,
				msg: "Code Executed Successfully",
				data: {
					passed_testcases: formattedResult.passed_testcases,
					submissions: finalResult,
				},
			});
		}

		// [Todo]: if all testcases passed then update the progress model/
		if (overAllStatus == "Accepted") { // means all testcase accepted
			// then update the progress model
			await saveProgress(userId, problemId)
		}

		return res.status(200).json({
			success: true,
			msg: "Code Executed Successfully",
			data: {
				passed_testcases: formattedResult.passed_testcases,
				submissions: formattedResult.submissions?.slice(0, 3),
			},
		});
	} catch (error: any) {
		console.log("SUBMIT_CODE_ROUTE_ERROR", error.message);
		return res.json({
			success: false,
			message: (error as Error).message,
		});
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

function formatExecutionResult(result: SubmissionsResult[] | undefined) {
	if (result == undefined) {
		return {
			success: false,
			msg: "Result not found!!",
		};
	}
	let passed_testcases: number = 0;

	const formattedResult: FormattedSubmissionType[] = result.map((res) => {
		if (res.status.description == "Accepted") passed_testcases++;
		return {
			input: res.stdin,
			user_output: res.stdout,
			expected_output: res.exptected_output,
			status: res.status.description,
			compile_output: res.compile_output,
		};
	});

	return {
		success: true,
		passed_testcases,
		submissions: formattedResult,
	};
}

export default router;
