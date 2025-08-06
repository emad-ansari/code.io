import { z } from "zod";

export const ProblemCategorySchema = z.object({
	name: z.string(),
	title: z.string(),
	imgUrl: z.string(),
	tags: z.string().array(),
});
export type ProblemCategoryType = z.infer<typeof ProblemCategorySchema>;

export const TestcaseSchema = z.array(
	z.object({
		input: z.string(),
		expected_output: z.string(),
		isSample: z.boolean(),
	})
);
export const TemplateCodeSchema = z.array(
	z.object({
		language: z.string(),
		full_template: z.string(),
		boiler_code: z.string(),
	})
);
export const ProblemSchema = z.object({
	problemCategory: z.string(),
	problemTitle: z.string(),
	description: z.string(),
	difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
	tags: z.string().array(),
	testcases: TestcaseSchema,
	templates: TemplateCodeSchema,
});

export type Problem = z.infer<typeof ProblemSchema>;

export const SignUpInputSchema = z.object({
	username: z.string().min(4).max(20),
	email: z.string().email(),
	password: z.string().min(4).max(20),
});

export const LoginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5).max(20),
});

export interface UserSubmissions {
	id: string;
	code: string;
	time: string;
	memory: string;
	langaugeId: number;
	status: UserSubmissionStatus;
}

enum UserSubmissionStatus {
	ACCEPTED,
	WRONG_ANSWER,
	TIME_LIMIT_EXCEEDED,
	MEMORY_LIMIT_EXCEEDED,
	RUNTIME_ERROR,
	COMPILATION_ERROR,
}

export interface SubmissionsResult {
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

// export interface Modifiedsubmission extends SubmissionsResult { // rename it as FormattedSubmission.
// 	inputs: TestCaseInput[]
// }

export const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	js: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 54 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};

export const convertDifficultyToEnum = (difficulty: string | undefined) => {
	switch (difficulty) {
		case "Easy":
			return "EASY";
		case "Medium":
			return "MEDIUM";
		case "Hard":
			return "HARD";
		default:
			return "";
	}
};

export const convertStatusToEnum = (status: string | undefined) => {
	switch (status) {
		case "Todo":
			return "TODO";
		case "Solved":
			return "SOLVED";
		case "Attempted":
			return "ATTEMPTED";
		default:
			return "";
	}
};
