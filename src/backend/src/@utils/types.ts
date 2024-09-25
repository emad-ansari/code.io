import { z } from "zod";

export const SingleTestCase = z.object({
	testcaseId: z.string(),
	inputs: z.array(
		z.object({
			name: z.string(),
			type: z.string(),
			value: z.string(),
		})
	),
	output: z.object({
		type: z.string(),
		value: z.string(),
	}),
});

export const TestCaseArray = z.array(SingleTestCase);

const Parameters = z.array(
	z.object({
		parameterId: z.string(),
		type: z.string(),
		name: z.string(),
	})
);

export const ProblemInput = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	returnType: z.string(),
	parameters: Parameters,
	testcases: TestCaseArray,
});

export const NewTestCaseFormat = z.object({
	problemTitle: z.string(),
	testcases: TestCaseArray,
});
export type ProblemType = z.infer<typeof ProblemInput>;
export type TestCaseType = z.infer<typeof NewTestCaseFormat>; // with title

export const SignUpInput = z.object({
	username: z.string().min(4).max(20),
	email: z.string().email(),
	password: z.string().min(4).max(20),
});

export const LoginInput = z.object({
	email: z.string().email(),
	password: z.string().min(5).max(20),
});

export const ProblemSubmissionData = z.object({
	problemId: z.string(),
	languageId: z.number(),
	code: z.string(),
});


export interface BoilerPlateCode {
	problemId: string;
	boilerplateCodes: {
		languageId: number;
		code: string;
	}[];
}

export interface TestCaseReturnType {
	title: string | null;
	inputs: {
		name: string;
		type: string;
		value: string;
	}[];
	output: {
		type: string;
		value: string;
	} | null;
}


export interface Problem {
	status: string;
	problem: {
		id: string;
		title: string;
		difficulty: string;
		problemNo: number;
	}
}
export interface ProblemWithDescription extends Problem {
	problem: Problem['problem'] & { 
		description: string; 
	};
	testcaseExamples: TestCaseReturnType[]
}