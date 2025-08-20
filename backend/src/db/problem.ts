import prisma from "./index";
import { Problem } from "../@utils/types";
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
		await prisma.problem.create({
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
	userAuthorized: boolean,
	userId: string
) {
	try {
		const { difficulty, status, searchKeywords } = filterQuery;

		const filterConditions: Prisma.ProblemWhereInput = {
			difficulty: difficulty ? difficulty : undefined,
			...(status && userAuthorized
				? { solvedProblems: { some: { status } } }
				: {}),
			title: searchKeywords
				? { contains: String(searchKeywords), mode: "insensitive" }
				: undefined,
		};

		const totalCount = await prisma.problem.count({
			where: filterConditions,
		});

		const category = await prisma.problemCategory.findMany({
			where: {
				name: categoryName,
			},
			select: {
				title: true,
				problems: {
					where: filterConditions,
					skip: (page - 1) * problemPerPage,
					take: problemPerPage,
					select: {
						id: true,
						problemNo: true,
						title: true,
						difficulty: true,
						_count: {
							select: {
								likes: true,
							},
						},
						submissions: true,
						solvedProblems: userAuthorized
							? {
									where: {
										userId: userId,
									},
									select: {
										status: true,
									},
							  }
							: false,
					},
				},
			},
		});
		
		const formattedProblem = category.flatMap((cat) =>
			cat.problems.map((p) => {
				return {
					id: p.id,
					categoryTitle: cat.title,
					problemNo: p.problemNo,
					title: p.title,
					difficulty: p.difficulty,
					likes: p._count.likes,
					submissions: p.submissions,
					status: p.solvedProblems.length > 0 ? p.solvedProblems[0].status : null,
				};
			})
		);

		return {
			problems: formattedProblem,
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
export async function getProblemDetail(
	problemId: string,
	userAuthorized: boolean,
	userId: string
) {
	try {
		const problemDetail = await prisma.problem.findFirst({
			where: {
				id: problemId,
			},
			select: {
				id: true,
				problemNo: true,
				title: true,
				description: true,
				difficulty: true,
				tags: true,
				_count: {
					select: {
						likes: true,
					},
				},
				solvedProblems: userAuthorized
					? {
							where: {
								userId,
							},
							select: {
								status: userAuthorized ? true : false,
							},
					  }
					: false,
			},
		});

		const status = userAuthorized ? problemDetail?.solvedProblems[0]?.status : "Todo";


		const formattedProblemDetail = {
			id: problemDetail?.id,
			problemNo: problemDetail?.problemNo,
			title: problemDetail?.title,
			description: problemDetail?.description,
			difficulty: problemDetail?.difficulty,
			likes: problemDetail?._count.likes,
			status: status == undefined ? "Todo" : status,
			tags: problemDetail?.tags,
		};
		return formattedProblemDetail;
	} catch (error: any) {
		console.log("GET_PROLBEM_DETAIL_DB_ERROR: ", error);
	}
}

export async function updateLikes(problemId: string, userId: string) {
	try {
		await prisma.likes.create({
			data: {
				userId,
				problemId,
			},
		});
	} catch (error: any) {
		console.log("UPDATE_LIKES_DB_ERROR: ", error.message);
		throw new Error(error);
	}
}

export async function getDefualtCode(problemId: string, language: string) {
	try {
		const res = await prisma.templateCode.findFirst({
			where: {
				problemId,
				language,
			},
			select: {
				boiler_code: true,
			},
		});
		return res;
	} catch (error: any) {
		console.log("GET_DEFUALT_CODE_DB_ERROR: ", error);
		throw new Error(error);
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
