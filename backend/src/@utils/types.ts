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
		isSample: z.boolean().optional(),
	})
);

export interface TestcaseType {
	input: string;
	expected_output: string;
}

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
	difficulty: z.string(),
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

export interface PreparedSubmissionArray {
	language_id: number;
	source_code: string;
	stdin: string;
	expected_output: string;
}

export interface PrepareSubmissionArrayProps {
	testcases: TestcaseType[];
	fullTemplate: string;
	languageId: number;
	code: string;
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

export interface FormattedSubmissionType {
	input: string;
	user_output: string;
	expected_output: string;
	status: string;
	compile_output: string | null;
}

export const LANGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	js: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 54 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};

export const JUDGE0_INCLUDED_RESPONSE_FIELD =
	"language_id,stdin,stdout,expected_output,time,memory,stderr,compile_output,message,status,status_id,source_code";
