import prisma from ".";
import bcrypt from "bcrypt";

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