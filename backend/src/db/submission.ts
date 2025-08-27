import prisma from "../db";
import { differenceInDays } from "date-fns";

interface UserSubmissionProps {
	userId: string;
	problemId: string;
	language: string;
	code: string;
	time: string;
	memory: number;
	resultStatus: string;
	problemStatus: string;
}

// get all user submissions
export async function getUserSubmissions(userId: string, problemId: string) {
	try {
		console.log('userid: ', userId, problemId);
		const submissions = await prisma.submission.findMany({
			where: {
				userId: userId,
				problemId: problemId,
			},
			select: {
				id: true,
				code: true,
				time: true,
				memory: true,
				language: true,
				status: true,
				createdAt: true,
			},
		});
		
		return submissions;
	} catch (error: any) {
		console.log("GET_PROBLEM_SUBMISSIONS_DB_ERROR: ", error);
	}
}

// get sample testcases
export async function getSampleTestcases(problemId: string) {
	try {
		const testcases = await prisma.testcase.findMany({
			where: {
				problemId,
				isSample: true,
			},
			select: {
				input: true,
				expected_output: true,
			},
		});
		return testcases;
	} catch (error: any) {
		console.log("GET_SAMPLE_TEST_CASES_DB_ERROR: ", error);
		throw new Error(error);
	}
}

// get full template code
export async function getFullTemplateCode(problemId: string, language: string) {
	try {
		const template = await prisma.templateCode.findFirst({
			where: {
				problemId,
				language,
			},
			select: {
				full_template: true,
			},
		});
		return template;
	} catch (error: any) {
		console.log("GET_SAMPLE_TEST_CASES_DB_ERROR: ", error);
		throw new Error(error);
	}
}

export async function getAllTestcases(problemId: string) {
	try {
		const testcases = await prisma.testcase.findMany({
			where: {
				problemId,
			},
			select: {
				input: true,
				expected_output: true,
				isSample: true,
			},
		});
		return testcases;
	} catch (error: any) {
		console.log("GET_SAMPLE_TEST_CASES_DB_ERROR: ", error);
		throw new Error(error);
	}
}

export async function saveUserSubmissionDetails(data: UserSubmissionProps) {
	try {
		/*
			1. first check if it is a new user or not
			2. if exist already then just update the data
			3. otherwise create a fresh user with current streak = 1 & longest streak = 1
		*/
		await updateStreak(data.userId);

		// create the activity log model.
		await prisma.activityLog.create({
			data: {
				userId: data.userId,
			},
		});

		// create the submission model
		await prisma.submission.create({
			data: {
				code: data.code,
				time: data.time,
				memory: data.memory,
				status: data.resultStatus,
				userId: data.userId,
				language: data.language,
				problemId: data.problemId,
			},
		});

		// create or update solved problems
		const solvedProblem = await prisma.problemSolved.findFirst({
			where: {
				userId: data.userId,
				problemId: data.problemId,
			},
			select: {
				id: true,
			},
		});
		
		if (!solvedProblem) {
			// then create it
			await prisma.problemSolved.create({
				data: {
					userId: data.userId,
					problemId: data.problemId,
				}
			});
			return;
		}
		// create the problemSolved model
		await prisma.problemSolved.update({
			where: {
				id: solvedProblem.id,
				userId: data.userId,
				problemId: data.problemId,
			},
			data: {
				status: data.problemStatus,
			},
		});
	} catch (error: any) {
		console.log("SAVE_USER_DETAILS_DB_ERROR: ", error);
		throw new Error(error);
	}
}

async function updateStreak(userId: string) {
	try {
		const userStreak = await prisma.streak.findUnique({
			where: {
				userId,
			},
			select: {
				userId: true,
				current: true,
				longest: true,
				lastUpdated: true,
			},
		});

		const today = new Date();
		if (!userStreak) {
			// then create
			await prisma.streak.create({
				data: {
					userId,
					current: 1,
					longest: 1,
					lastUpdated: today,
				},
			});
			return;
		}

		// else update the streak
		const daysDiff = differenceInDays(today, userStreak.lastUpdated);

		if (daysDiff == 0) return;
		else if (daysDiff == 1) {
			const newCurrent = userStreak.current + 1;
			await prisma.streak.update({
				where: { userId },
				data: {
					current: newCurrent,
					longest: Math.max(newCurrent, userStreak.longest),
					lastUpdated: today,
				},
			});
		} else {
			// Break streak → reset
			await prisma.streak.update({
				where: { userId },
				data: {
					current: 1,
					lastUpdated: today,
				},
			});
		}
	} catch (error: any) {
		console.log("UPDATE_STREAK_DB_ERROR: ", error);
		throw new Error(error);
	}
}

export async function saveProgress(userId: string, problemId: string) {
	try {
		const userProgress = await prisma.progress.findFirst({
			where: {
				userId,
			},
			select: {
				id: true,
				easySolved: true,
				mediumSolved: true,
				hardSolved: true,
				totalSolved: true,
				categoryProgress: {
					select: {
						totalSolved: true,
					},
				},
			},
		});
		// get the cateogryId and difficulty levle using problemId from problem model

		const problem = await prisma.problem.findFirst({
			where: {
				id: problemId,
			},
			select: {
				difficulty: true,
				categoryId: true,
			},
		});

		if (!problem) {
			return {
				success: false,
				msg: "Failed to fetch the problem with the problem id ",
			};
		}

		let easySolved = userProgress ? userProgress.easySolved : 0;
		let mediumSolved = userProgress ? userProgress.mediumSolved : 0;
		let hardSolved = userProgress ? userProgress.hardSolved : 0;

		if (problem.difficulty === "Easy") {
			easySolved += 1;
		} else if (problem.difficulty === "Medium") {
			mediumSolved += 1;
		} else {
			// difficulty will be hard
			hardSolved += 1;
		}

		if (!userProgress) {
			// create new user progress & category progress

			const newProgress = await prisma.progress.create({
				data: {
					totalSolved: 1,
					easySolved,
					mediumSolved,
					hardSolved,
					userId,
				},
				select: {
					id: true,
				},
			});

			if (!newProgress) {
				return {
					success: false,
					msg: "Failed to create new progress",
				};
			}
			// now create a category progress
			await prisma.categoryProgress.create({
				data: {
					progressId: newProgress.id,
					totalSolved: 1,
					categoryId: problem.categoryId,
				},
			});
			return {
				success: true,
				msg: "New user progress created successfully",
			};
		}

		// otherwise just update the progress

		const updatedProgress = await prisma.progress.update({
			where: {
				id: userProgress.id,
				userId,
			},
			data: {
				easySolved,
				mediumSolved,
				hardSolved,
				totalSolved: userProgress.totalSolved + 1,
			},
			select: {
				id: true,
				categoryProgress: {
					select: {
						id: true,
						totalSolved: true,
					},
				},
			},
		});

		if (!updatedProgress) {
			return {
				success: false,
				msg: "Failed to update existing progress!!",
			};
		}

		await prisma.categoryProgress.update({
			where: {
				id: updatedProgress.categoryProgress[0].id,
				progressId: userProgress.id,
				categoryId: problem.categoryId,
			},
			data: {
				totalSolved:
					updatedProgress.categoryProgress[0].totalSolved + 1,
			},
		});

		return {
			success: true,
			msg: "Progress updated successfully",
		};
	} catch (error: any) {
		console.log("SAVE_PROGRESS_DB_ERROR: ", error);
	}
}
