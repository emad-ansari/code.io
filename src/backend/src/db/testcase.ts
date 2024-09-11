import prisma from "../db/index";

interface TestCaseProps {
	problemId: string;
	problemTitle: string;
	testcases: {
		inputs: {
			name: string;
			type: string;
			value: string
		}[],
		output: {
			type: string;
			value: string
		} | null
	}[]
}
type TestCase = Pick<TestCaseProps, 'testcases'>['testcases'];
// needs to modify createTestCase function
export async function createTestCases({ problemId, problemTitle, testcases }: TestCaseProps): Promise<{success: boolean, msg: string}> {
	try {

		for (const testcase of testcases) {
            // Create the TestCase entry
            const createdTestCase = await prisma.testCase.create({
                data: {
                    title: problemTitle,  // You can use the same title for all test cases, or modify this
                    problemId,  // Problem this testcase is associated with
                }
            });

            // Insert each input for the testcase
            for (const input of testcase.inputs) {
                await prisma.testCaseInput.create({
                    data: {
                        name: input.name,
                        type: input.type,
                        value: input.value,
                        testcaseId: createdTestCase.id,  // Link to the created TestCase
                    }
                });
            }

            // Insert the output for the testcase if it exists
            if (testcase.output) {
                await prisma.testCaseOutput.create({
                    data: {
                        type: testcase.output.type,
                        value: testcase.output.value,
                        testcaseId: createdTestCase.id,  // Link to the created TestCase
                    }
                });
            }
		}
		
        return {
            success: true,
            msg: "Testcases created successfully"
        }
	}
	catch (error: any) {
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

// get all test cases
async function getAllTestcases(problemId: string ): Promise<{ success: boolean, data?:TestCase, err?: string }>{
	try{
		const testcases = await prisma.testCase.findMany({
			where: {
				problemId
			},
			select: {
				inputs: {
					select: {
						name: true,
						type: true,
						value: true
					}
				},
				output: {
					select: {
						type: true,
						value: true
					}
				}
			}
		});

		return {
			success: true,
			data: testcases.map(testcase => {
				return { inputs: testcase.inputs, output: testcase.output}	
			})
		}
	}
	catch(error: any){
		console.error("Error occured while getting all Testcases :", (error as Error).message);
		return {
			success: false,
			err: "Error occurred while fetching all Testcases"
		}
	}
}