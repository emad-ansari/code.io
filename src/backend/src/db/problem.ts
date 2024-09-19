import prisma from "./index";
import { Problem } from "../@utils/types";

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
