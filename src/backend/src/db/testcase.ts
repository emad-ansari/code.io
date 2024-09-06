import prisma from "../db/index";

interface TestCaseProps {
	problemId: string;
	testcases: {
		input: string;
		output: string;
	}[];
}

export async function createTestCases({ problemId, testcases }: TestCaseProps): Promise<{success: boolean, msg: string}> {
	try {
		const createdTestCases = await prisma.testCase.createMany({
			data: testcases.map((testcase) => ({
				problemId, // Associate the test case with the problemId
				stdin: testcase.input,
				stdout: testcase.output,
			})),
			skipDuplicates: true, // Optional: prevents creating duplicates if needed
		});
        return {
            success: true,
            msg: "Testcases created successfully"
        }
	} catch (error: any) {
		console.error(
			"Error while creating new testcase :",
			(error as Error).message
		);
        return {
            success: false,
            msg: error.message
        }
	}
}
