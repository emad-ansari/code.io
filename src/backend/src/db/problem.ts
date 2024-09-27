import prisma from "./index";
import { Problem, ProblemWithDescription } from "../@utils/types";

export async function createProblem(
	title: string,
	description: string,
	difficulty: string,
	userId: string
): Promise<{ success: boolean; msg: string; id: string }> {
	try {
		// you need to generate a new problem no
		const lastProblem = await prisma.problem.findFirst({
			orderBy: {
				problemNo: "desc",
			},
			select: {
				problemNo: true,
			},
		});
		let newProblemNo: number = 1;

		if (lastProblem !== null) {
			newProblemNo = lastProblem.problemNo + 1;
		}
		// if problem with the given title does not exist then only create the problem
		const isTitleExist = await prisma.problem.findUnique({
			where: {
				title: title,
			},
			select: {
				id: true,
			},
		});

		if (isTitleExist) {
			return {
				success: false,
				msg: `problem already exist with the ${title}`,
				id: "",
			};
		}
		const newProblem = await prisma.problem.create({
			data: {
				title,
				description,
				difficulty,
				problemNo: newProblemNo,
				createdBy: userId,
			},
			select: {
				id: true,
			},
		});
		// before return create problemstatus field for all user
        createProblemStatus(newProblem.id);
		return {
			success: true,
			msg: "problem created successfully",
			id: newProblem.id,
		};
	} catch (error: any) {
		console.error(
			"Error occurred while creating new problem: ",
			(error as Error).message
		);
		return {
			success: false,
			msg: error.message,
			id: "",
		};
	}
}

export async function getProblemsWithStatus(userId: string): Promise<{success: boolean, problems: Problem[]}> {
	// there is no filter options [ title, difficulty, problemNo, status with each problem]
	try {
		const problems = await prisma.problemStatus.findMany({
			where: {
				userId,
			},
			select: {
				status: true,
				problem: {
					select: {
						id: true,
						title: true,
						difficulty: true,
						problemNo: true,
					},
				},
			},
		});
		if (problems){
			return {
				success: true,
				problems
			}
		}
		return {
			success: false,
			problems: []
		}
		
		
	} catch (error: any) {
		return {
			success: false,
			problems: []
		}
	}
}


export async function getProblemsWithoutStatus(): Promise<{success: boolean, problems: Problem[]}>{
	try {
		const problems = await prisma.problem.findMany({
			select: {
				id: true,
				title: true,
				difficulty: true,
				problemNo: true
			}
		});
		if (problems){
			const updatedProblems: Problem[] = problems.map(p => {
				return { status: "", problem: {...p}};
			})
			return {
				success: true,
				problems: updatedProblems
			}
		}
		return {
			success: false,
			problems: []
		}
		
		
	} catch (error: any) {
		return {
			success: false,
			problems: []
		}
	}
}

export async function createProblemStatus(problemId: string) {
	try {
		const users = await prisma.user.findMany({
			select: {
				id: true,
			},
		});
		const problemStatuses = await prisma.problemStatus.createMany({
			data: users.map((user) => ({
				userId: user.id,
				problemId: problemId,
				status: "todo", // You can omit this as it defaults to 'todo'
			})),
		});

	} catch (error: any) {}
}


export async function getProblemDetailWithStatus( userId: string, problemId: string): Promise<{success: boolean, problemDetail?: ProblemWithDescription, msg: string}>{
	try {
		
		const result = await prisma.problemStatus.findFirst({
			where: {
				userId,
				problemId
			},
			select: {
				status: true,
				problem: {
					select: {
						id: true,
						title: true,
						description: true,
						difficulty: true,
						problemNo: true
					}
				}
			}
		})
		if (result){
			const testcaseExamples = await getTestCaseExample(problemId);
			if (!testcaseExamples){
				return {
					success: false,
					msg: "Test case not found"
				}
			}
			const problemDetails: ProblemWithDescription = { ...result, testcaseExamples}
			return {
				success: true,
				problemDetail: problemDetails,
				msg: ""
			}
		}

		return {
			success: false,
			msg: "problem not found"
		}

	}
	catch(error: any){
		console.log(error.message);
		return {
			success: false,
			msg: error.message
		}
	}

}

export async function getProblemDetailWithoutStatus(problemId: string){
	// i have to also send the testcases 
	try{
		const result = await prisma.problem.findFirst({
			where: {
				id: problemId
			},
			select: {
				id: true,
				title: true,
				description: true,
				difficulty: true,
				problemNo: true
			}
		})
		if (result){
			// find the testcase
			const testcaseExamples = await getTestCaseExample(problemId);
			if (!testcaseExamples){
				return {
					success: false,
					msg: "Test case not found"
				}
			}
			const problemDetail: ProblemWithDescription = {status: "", problem: {...result}, testcaseExamples }
			return {
				success: true,
				problemDetail,
				msg: ""
			}
		}
		return {
			success: false,
			msg: "Problem Not found"
		}

	}	
	catch(error: any){
		return {
			success: false,
			msg: error.message
		}
	}
}

export async function getTestCaseExample(problemId: string){
	try {
		const testcaseExamples = await prisma.testCase.findMany({
			where: {
				problemId
			},
			take: 3,
			select: {
				title: true,
				inputs: {
					select: {
						type: true,
						name: true,
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
		})
		return testcaseExamples;
	}
	catch(error: any){

	}
}