import { z } from "zod";

export const ProblemInputSchema = z.array(
	z.object({
		name: z.string(),
		type: z.string(),
		value: z.string(),
	})
)

export const problemOutputSchema = z.object({
	type: z.string(),
	value: z.string(),
})

export const TestCaseSchema = z.object({
	testcaseId: z.string(),
	inputs: ProblemInputSchema,
	output: problemOutputSchema,
});

// export const TestCaseArray = z.array(TestCaseSchema);

const ParameterSchema = z.array(
	z.object({
		parameterId: z.string(),
		type: z.string(),
		name: z.string(),
	})
);

export const ProblemSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	difficulty: z.string(),
	returnType: z.string(),
	parameters: ParameterSchema,
	testcases: TestCaseSchema.array(),
});



export const NewTestCaseFormat = z.object({
	problemTitle: z.string(),
	testcases: TestCaseSchema.array(),
});

export type ProblemType = z.infer<typeof ProblemSchema>;

export type TestCaseType = z.infer<typeof NewTestCaseFormat>; // with title

export const SignUpInputSchema = z.object({
	username: z.string().min(4).max(20),
	email: z.string().email(),
	password: z.string().min(4).max(20),
});

export const LoginInputSchema = z.object({
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


export interface Problem { // check if not use remove it
	status: string;
	problem: {
		id: string;
		title: string;
		difficulty: string;
		problemNo: number;
	}
}
export interface ProblemWithDescription extends Problem {  // check and if not use remove it 
	problem: Problem['problem'] & { 
		description: string; 
	};
	testcaseExamples: TestCaseReturnType[]
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

