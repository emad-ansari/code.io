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
exports.getUserSubmissions = getUserSubmissions;
const db_1 = __importDefault(require("../db"));
// import prisma from ".";
// interface UserSubmissionProps {
//     userId: string;
//     problemId: string;
//     languageId: number;
//     code: string;
//     time: string;
//     memory: string
//     status: string
// }
// GET ALL USER SUBMISSIONS
function getUserSubmissions(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield db_1.default.user.findMany({
                select: {
                    submissions: {
                        select: {
                            id: true,
                            code: true,
                            time: true,
                            memory: true,
                            languageId: true,
                            status: true
                        }
                    }
                }
            });
            const allSubmissions = result.flatMap(user => user.submissions);
            return allSubmissions;
        }
        catch (error) {
            console.log("GET_PROBLEM_SUBMISSIONS_DB_ERROR: ", error);
        }
    });
}
// export async function createSubmission (submision: UserSubmissionProps) {
//     try {
//         const submission = await prisma.submission.create({
//             data: {
//                 userId: submision.userId,
//                 problemId: submision.problemId,
//                 languageId: submision.languageId,
//                 code: submision.code,
//                 time: submision.time,
//                 memory: submision.memory,
//                 status: submision.status
//             }
//         })
//     }
//     catch(error: any) {
//         console.log("CREATE_SUBMSSSION", error.message);
//     }
// }
// export async function getSubmissions (userId: string) {
//     try {
//         const submissions = await prisma.submission.findMany({
//             where: {
//                 userId
//             },
//             select: {
//                 id: true,
//                 languageId: true,
//                 code: true,
//                 time: true,
//                 memory: true,
//                 status: true,
//                 createdAt: true
//             }
//         })
//         return submissions;
//     }
//     catch(error: any) {
//         console.log("CREATE_SUBMSSSION", error.message);
//     }
// }
