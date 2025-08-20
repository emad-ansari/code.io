"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProblem = createProblem;
exports.getAllProblems = getAllProblems;
exports.getProblemsOnAdminPage = getProblemsOnAdminPage;
exports.getProblemDetail = getProblemDetail;
const index_1 = __importDefault(require("./index"));
const types_1 = require("../@utils/types");
// CREATE: new problem
function createProblem(data, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // if problem with the given title does not exist then only create the problem
            const problem = yield index_1.default.problem.findUnique({
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
            const category = yield index_1.default.problemCategory.findFirst({
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
            const newProblem = yield index_1.default.problem.create({
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
        }
        catch (error) {
            console.log("CREATE_NEW_PROBLEM_DB_ERROR: ", error);
            return {
                success: false,
                msg: error.message,
            };
        }
    });
}
// GET: all problems on user page
function getAllProblems(categoryName, page, problemPerPage, filterQuery, userAuthorized) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const difficulty = (0, types_1.convertDifficultyToEnum)(filterQuery.difficulty);
            const status = (0, types_1.convertStatusToEnum)(filterQuery.status);
            const filterConditions = {
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
            const totalCount = yield index_1.default.problem.count({
                where: filterConditions,
            });
            const problems = yield index_1.default.problem.findMany({
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
        }
        catch (error) {
            console.log("GET_ALL_PROBLEMS_DB_ERROR", error);
        }
    });
}
// GET all prooblems on admin page
function getProblemsOnAdminPage(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problems = yield index_1.default.problem.findMany({
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
        }
        catch (error) {
            console.log("Error while fetching all problem");
        }
    });
}
// GET current problem details
function getProblemDetail(problemId, userAuthorized) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const problemDetail = yield index_1.default.problem.findFirst({
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
                            status: userAuthorized ? true : false
                        }
                    }
                }
            });
            return problemDetail;
        }
        catch (error) {
            console.log("GET_PROLBEM_DETAIL_DB_ERROR: ", error);
        }
    });
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
