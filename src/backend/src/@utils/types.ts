import { z } from "zod";



const TestCaseInputOjectSchema = z.object({
	name: z.string(),
	type: z.string(),
	value: z.string(),
})

export const TestCaseInputSchema = z.array(TestCaseInputOjectSchema)

export const TestCaseOutputSchema = z.object({
	type: z.string(),
	value: z.string(),
})
export type TestCaseInput = z.infer<typeof TestCaseInputOjectSchema > // used
export type TestCaseOutput = z.infer<typeof TestCaseOutputSchema>    // used

export const TestCaseSchema = z.object({
	testcaseId: z.string(),
	inputs: TestCaseInputSchema,
	output: TestCaseOutputSchema,
});

// export const TestCaseArray = z.array(TestCaseSchema);

const ParameterSchema = z.array( // check and delete
	z.object({
		parameterId: z.string(),
		type: z.string(),
		name: z.string(),
	})
);

export const testcaseFormSchema = z.object({
	id: z.string(),
	input: z.string(),
	output: z.string(),
})
export type Testcase = z.infer<typeof testcaseFormSchema>;

export const problemFormSchema = z.object({
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	testcases: testcaseFormSchema.array()
})

export const ProblemSchema = z.object({ // check and delete
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	returnType: z.string(),
	parameters: ParameterSchema,
	testcases: TestCaseSchema.array(),
});

export type Problem = z.infer<typeof ProblemSchema>;

export const  NewTestCaseSchema = z.object({
	problemTitle: z.string(),
	testcases: TestCaseSchema.array(),
});


export type NewTestCase = z.infer<typeof NewTestCaseSchema>; // with title

export const SignUpInputSchema = z.object({
	username: z.string().min(4).max(20),
	email: z.string().email(),
	password: z.string().min(4).max(20),
});

export const LoginInputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(5).max(20),
});

export const ProblemSubmissionDataSchema = z.object({
	problemTitle: z.string(),
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

export interface ProblemDetail {
	id: string;
	title: string;
	difficulty: string;
	problemNo: number;
	testcaseExamples: TestCaseReturnType[]
}
export interface ProblemDetailWithStatusOnUser extends ProblemDetail { // check if used or not
	problemStatus?: {
		status: string
	}
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

export interface Modifiedsubmission extends SubmissionsResult { // rename it as FormattedSubmission.
	inputs: TestCaseInput[]
}

export const LNAGUAGE_MAPPING: {
	[key: string]: { name: string; languageId: number };
} = {
	js: { name: "javascript", languageId: 63 },
	cpp: { name: "cpp", languageId: 54 },
	typescript: { name: "typescript", languageId: 74 },
	java: { name: "java", languageId: 62 },
	python: { name: "python", languageId: 71 },
};