import prisma from "../db";

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
export async function getUserSubmissions(userId: string) {
	try {
		const result = await prisma.user.findMany({
			select: {
				submissions: {
					select: {
						id: true,
						code: true,
						time: true,
						memory: true,
						languageId: true,
						status: true,
						createdAt: true

					}
				}
			}
		})

		const allSubmissions = result.flatMap(user => user.submissions);
		return allSubmissions;
	}
	catch(error: any) {
		console.log("GET_PROBLEM_SUBMISSIONS_DB_ERROR: ", error);
	}
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


