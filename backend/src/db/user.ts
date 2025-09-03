import { escape } from "querystring";
import prisma from ".";
import bcrypt from "bcryptjs";

// CREATE NEW USER
export async function createUser(
	username: string,
	email: string,
	password: string
): Promise<{ success: boolean; msg: string }> {
	try {
		const allowedAdminsEmails = process.env.ALLOWED_ADMINS?.split(",") || [];

		const userRole = allowedAdminsEmails.includes(email) ? "Admin" : "User";

		const hashedPassword = await bcrypt.hash(password, 10);

		// create new user.
		await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
				role: userRole,
			},
		});
		return {
			success: true,
			msg: "User Created Successfully"
		}
	} catch (error: any) {
		return {
			success: false,
			msg: error.message,
		};
	}
}

// FIND NEW USER
export async function findUser(email: string, password: string) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
			select: {
				password: true,
				id: true,
				role: true,
				username: true
			},
		});
		if (!user) {
			return {
				success: false,
				msg: "User Not found",
			};
		} else {
			const matchPassword = await bcrypt.compare(password, user.password);
			if (matchPassword) {
				return {
					success: true,
					msg: "User found",
					userId: user.id,
					role: user.role,
					username: user.username
				};
			} else {
				return {
					success: false,
					msg: "Incorrect Password!!",
				};
			}
		}
	} catch (error: any) {
		return {
			success: false,
			msg: error.message,
		};
	}
}

// GET ALL USERS ON ADMIN PAGE
export async function getAllUsers(page: number) {
	try {
		const users = await prisma.user.findMany({
			skip: (page - 1) * 10,
			take: 10,
			select: {
				id: true,
				username: true,
				email: true,
				role: true,
			},
			orderBy: {
				createdAt: "desc"
			}

		})

		return users;
	}
	catch(error: any) {
		console.log("GET_ALL_USERS_DB_ERROR", error);
	}
}

export async function getUserProfile (userId: string) {
	try {

		// get total easy, medium and hard problem, and total problem also
		const totalEasy  = await prisma.problem.count({
			where: {
				difficulty: "Easy"
			}
		});
		const totalMedium = await prisma.problem.count({
			where: {
				difficulty: "Medium"
			}
		})
		const totalHard = await prisma.problem.count({
			where: {
				difficulty: "Hard"
			}
		})

		const totalProblems = await prisma.problem.count();

		const solvedProblems = await prisma.user.findFirst({
			where: {
				id: userId,
			},
			select: {
				username: true,
				progress: {
					select: {
						easySolved: true,
						mediumSolved: true,
						hardSolved: true,
						totalSolved: true
					}
				},
				streak: {
					select: {
						current: true,
						longest: true
					}
				}
			}
		})

		return {
			username: solvedProblems?.username,
			easyProgress:{
				solved: solvedProblems?.progress?.easySolved,
				total: totalEasy
			},
			mediumProgress: {
				solved: solvedProblems?.progress?.mediumSolved,
				total: totalMedium
			},
			hardProgress: {
				solved: solvedProblems?.progress?.hardSolved,
				total: totalHard
			},
			overAllProgress: {
				solved: solvedProblems?.progress?.totalSolved,
				total: totalProblems
			},
			currentStreak: solvedProblems?.streak?.current,
			longestStreak: solvedProblems?.streak?.longest
		}
	}
	catch(err: any) {
		console.log("GET_USER_PROIFLE_DB_ERROR: ", err);
		throw new Error(err);
	}
}