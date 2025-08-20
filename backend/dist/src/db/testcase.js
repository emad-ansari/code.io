"use strict";
// import prisma from "../db/index";
// import { TestCaseSchema, TestCaseReturnType } from "../@utils/types";
// import { z } from "zod";
// export type TestCase = z.infer<typeof TestCaseSchema>; // without title
// interface TestCaseProps {
// 	problemId: string;
// 	title: string;  // remove
// 	testcases: TestCase[]
// }
// // function to create new testcase which does not exist
// export async function createTestCases({
// 	problemId,
// 	title, // remove
// 	testcases,
// }: TestCaseProps): Promise<{ success: boolean; msg: string }> {
// 	try {
// 		for (const testcase of testcases) {
// 			// Insert each input for the testcase
// 			const createdTestCase = await prisma.testCase.create({
// 				data: {
// 					title, // remove
// 					problemId, 
// 				},
// 			});
// 			createTestCaseInputAndOutput(createdTestCase.id, testcase);
// 		}
// 		return {
// 			success: true,
// 			msg: "Testcases created successfully",
// 		};
// 	} catch (error: any) {
// 		console.error(
// 			"Error while creating new testcase :",
// 			(error as Error).message
// 		);
// 		return {
// 			success: false,
// 			msg: error.message,
// 		};
// 	}
// }
// // get all test cases
// export async function getAllTestcases(
// 	problemId: string
// ): Promise<{ success: boolean; data?: TestCaseReturnType[]; err?: string }> {
// 	try {
// 		const testcases = await prisma.testCase.findMany({
// 			where: {
// 				problemId,
// 			},
// 			select: {
// 				title: true,
// 				inputs: {
// 					select: {
// 						name: true,
// 						type: true,
// 						value: true,
// 					},
// 				},
// 				output: {
// 					select: {
// 						type: true,
// 						value: true,
// 					},
// 				},
// 			},
// 		});
// 		return {
// 			success: true,
// 			data: testcases,
// 		};
// 	} catch (error: any) {
// 		console.error(
// 			"Error occured while getting all Testcases :",
// 			(error as Error).message
// 		);
// 		return {
// 			success: false,
// 			err: "Error occurred while fetching all Testcases",
// 		};
// 	}
// }
// // this function will add new input and output  for an existing testcase
// export async function addTestCases(title: string, testcases: TestCase[]) {
// 	try {
// 		// find the problem id in Problem model with given title
// 		const testcase = await prisma.testCase.findFirst({
// 			where: {
// 				title,
// 			},
// 			select: {
// 				id: true,
// 			},
// 		});
// 		if (!testcase) {
// 			return; // you can return the message: "problem with title does not exist in record"
// 		}
// 		// Now query on Testcase model to save the testcases
// 		for (const exampleCase of testcases) {
// 			createTestCaseInputAndOutput(testcase.id, exampleCase);
// 		}
// 	} catch (error: any) {
// 		console.error(error.message);
// 	}
// }
// async function createTestCaseInputAndOutput(
// 	testcaseId: string,
// 	testcase: TestCase
// ) {
// 	try {
// 		for (const input of testcase.inputs) {
// 			await prisma.testCaseInput.create({
// 				data: {
// 					name: input.name,
// 					type: input.type,
// 					value: input.value,
// 					testcaseId: testcaseId, // Link to the created TestCase
// 				},
// 			});
// 		}
// 		// Insert the output for the testcase if it exists
// 		if (testcase.output) {
// 			await prisma.testCaseOutput.create({
// 				data: {
// 					type: testcase.output.type,
// 					value: testcase.output.value,
// 					testcaseId: testcaseId // Link to the created TestCase
// 				},
// 			});
// 		}
// 	} catch (error: any) {
// 		console.error(error.message);
// 	}
// }
