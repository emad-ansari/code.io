import prisma from "./index";
import {
	Problem,
	UserSubmissions,
	convertDifficultyToEnum,
	convertStatusToEnum,
} from "../@utils/types";
import { Prisma } from "@prisma/client";

// CREATE: new problem
export async function createProblem(
	data: Problem,
	userId: string
): Promise<{ success: boolean; msg: string }> {
	try {
		// if problem with the given title does not exist then only create the problem
		const problem = await prisma.problem.findUnique({
			where: {
				title: data.problemTitle,
			},
			select: {
				id: true,
			},
		});

		if (problem) {
			return {
				success: false,
				msg: `problem already exist with the title ${data.problemTitle}`,
			};
		}
		// get problem category id
		const category = await prisma.problemCategory.findFirst({
			where: {
				name: data.problemCategory,
			},
			select: {
				id: true,
			},
		});

		if (category == null) {
			return {
				success: false,
				msg: "Category Not Found",
			};
		}
		// create new problem with the category id
		const newProblem = await prisma.problem.create({
			data: {
				title: data.problemTitle,
				description: data.description,
				difficulty: data.difficulty,
				tags: data.tags,
				testcases: {
					create: data.testcases,
				},
				templates: {
					create: data.templates,
				},
				categoryId: category.id,
				createdBy: userId,
			},
		});

		return {
			success: true,
			msg: "Problem Created Successfully",
		};
	} catch (error: any) {
		console.log("CREATE_NEW_PROBLEM_DB_ERROR: ", error);
		return {
			success: false,
			msg: error.message,
		};
	}
}

// GET: all problems on user page
export async function getAllProblems(
	categoryName: string,
	page: number,
	problemPerPage: number,
	filterQuery: {
		difficulty?: string | undefined;
		status?: string | undefined;
		searchKeywords?: string | undefined;
	},
	userAuthorized: boolean
) {
	try {
		const difficulty = convertDifficultyToEnum(filterQuery.difficulty);
		const status = convertStatusToEnum(filterQuery.status);

		const filterConditions: Prisma.ProblemWhereInput = {
			category: {
				name: categoryName,
			},
			difficulty: difficulty ? difficulty : undefined,
			solvedProblems: {
				some: {
					status: status && userAuthorized ? status : undefined,
				},
			},

			title: filterQuery.searchKeywords
				? {
						contains: String(filterQuery.searchKeywords),
						mode: "insensitive",
				  }
				: undefined,
		};

		const totalCount = await prisma.problem.count({
			where: filterConditions,
		});

		const problems = await prisma.problem.findMany({
			where: filterConditions,
			skip: (page - 1) * problemPerPage,
			take: problemPerPage,
			select: {
				id: true,
				problemNo: true,
				title: true,
				difficulty: true,
				category: {
					select: {
						title: true,
					},
				},
				likes: true,
				submissions: true,
			},
		});

		return {
			problems,
			totalCount,
		};
	} catch (error: any) {
		console.log("GET_ALL_PROBLEMS_DB_ERROR", error);
	}
}

// GET all prooblems on admin page
export async function getProblemsOnAdminPage(page: number) {
	try {
		const problems = await prisma.problem.findMany({
			skip: (page - 1) * 15,
			take: 15,
			select: {
				id: true,
				problemNo: true,
				title: true,
				difficulty: true,
				category: {
					select: {
						name: true,
					},
				},
				likes: true,
				submissions: true,
			},
		});

		return problems;
	} catch (error: any) {
		console.log("Error while fetching all problem");
	}
}

// GET current problem details
export async function getProblemDetail(problemId: string, userAuthorized: boolean) {
	try {
		const problemDetail = await prisma.problem.findFirst({
			where: {
				id: problemId
			},
			select: {
				id: true,
				problemNo: true,
				title: true,
				description: true,
				difficulty: true,
				likes: true,
				tags: true,
				solvedProblems: {
					select: {
						status: userAuthorized ? true: false
					}
				}
			}
		})
		return problemDetail;

	} catch (error: any) {
		console.log("GET_PROLBEM_DETAIL_DB_ERROR: ", error);
	}
}




// export async function getOneProblemStatusOnUser(
// 	userId: string,
// 	problemId: string
// ): Promise<{ success: boolean; msg: string; status?: string }> {
// 	try {
// 		const problemStatusOnUser = await prisma.problemStatus.findFirst({
// 			where: {
// 				userId,
// 				problemId,
// 			},
// 			select: {
// 				status: true,
// 			},
// 		});
// 		if (problemStatusOnUser) {
// 			return {
// 				success: true,
// 				msg: "Problem status on user",
// 				status: problemStatusOnUser.status,
// 			};
// 		}
// 		return {
// 			success: false,
// 			msg: "Problem status not found for user",
// 		};
// 	} catch (error: any) {
// 		return {
// 			success: false,
// 			msg: error.message,
// 		};
// 	}
// }

// export async function getTestCaseExample(problemId: string) {
// 	try {
// 		const testcaseExamples = await prisma.testCase.findMany({
// 			where: {
// 				problemId,
// 			},
// 			take: 3,
// 			select: {
// 				title: true,
// 				inputs: {
// 					select: {
// 						type: true,
// 						name: true,
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
// 		return testcaseExamples;
// 	} catch (error: any) {
// 		console.log("Error: ", error.message);
// 	}
// }

// export async function updateProblemStatusOnUser (userId: string, problemId: string, status: string) {
// 	try {
// 		await prisma.problemStatus.updateMany({
// 			where: {
// 				userId,
// 				problemId
// 			},
// 			data: {
// 				status
// 			}
// 		})
// 	}
// 	catch(error: any){
// 		console.log("UPDATE_PROBLEM_STATUS ", error.message);
// 	}
// }
