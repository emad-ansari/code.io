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


// get all user submissions
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

// get sample testcases
export async function getSampleTestcases(problemId: string) {
	try{
		const testcases = await prisma.testcase.findMany({
			where:{
				problemId,
				isSample: true
			},
			select: {
				input: true,
				expected_output: true
			}
		})
		return testcases

	}
	catch(error: any) {
		console.log('GET_SAMPLE_TEST_CASES_DB_ERROR: ', error);
		throw new Error(error);
	}
}

// get full template code
export async function getFullTemplateCode(problemId: string, language: string) {
	try{
		const template = await prisma.templateCode.findUnique({
			where:{
				problemId,
				language
			},
			select: {
				full_template: true
			}
		})
		return template

	}
	catch(error: any) {
		console.log('GET_SAMPLE_TEST_CASES_DB_ERROR: ', error);
		throw new Error(error);
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


