import { ProblemCategoryType } from "../@utils/types";
import prisma from "../db/index";

export async function createNewProblemCategory(
	data: ProblemCategoryType
): Promise<{ success: boolean; msg: string; category?: ProblemCategoryType }> {
	try {
		const category = await prisma.problemCategory.findFirst({
			where: {
				name: data.name,
			},
		});

		if (category) {
			return {
				success: false,
				msg: "Category Already exist please give another name",
			};
		}
		// otherwise create new category
		await prisma.problemCategory.create({
			data: {
				name: data.name,
				title: data.title,
				imgUrl: data.imgUrl,
				tags: data.tags,
			},
		});

		return {
			success: true,
			msg: "Category created successfully",
		};
	} catch (error: any) {
		console.log("CREATE_NEW_CATEGORY_DB_ERROR: ", error);
		return {
			success: false,
			msg: error,
		};
	}
}

export async function getAllCategoryOnAdminPage() {
	try {
		const categories = await prisma.problemCategory.findMany();
		return categories;
	} catch (error: any) {
		console.log("GET_ALL_CATEGORY_ON_ADMIN_PAGE_ERROR: ", error);
	}
}

// GET ALL CATEGORY On user page
export async function getAllCategory(userAuthorized: boolean, userId: string) {
	try {
		const categories = await prisma.problemCategory.findMany({
			select: {
				name: true,
				title: true,
				tags: true,
				imgUrl: true,
				_count: {
					select: {
						problems: true,
					},
				},
				...(userAuthorized && {
					problems: {
						where: {
							solvedProblems: {
								some: { userId, status: "Solved" },
							},
						},
						select: { id: true },
					},
				}),
			},
		});

		const result = categories.map((cat) => ({
			name: cat.name,
			title: cat.title,
			tags: cat.tags,
			imgUrl: cat.imgUrl,
			totalProblems: cat._count.problems,
			solvedProblems: userAuthorized ? cat.problems.length : 0,
		}));

		return result;
	} catch (error: any) {
		console.log("GET_ALL_CATEGORY_ERROR: ", error);
		throw error;
	}
}
