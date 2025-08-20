import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { createProblem } from "../src/db/problem";
import { problems } from "./data";
import { Problem } from "../src/@utils/types";


const adminId = process.env.ADMIN_USER_ID || "123";
const prisma = new PrismaClient();

async function main() {
	let seed = false
	for (const problem of problems) {
		// Read description file
		const description = fs.readFileSync(
			path.join(__dirname, "./problem.md"),
			"utf-8"
		);

		
		// Insert into DB
		const data: Problem = {
			problemCategory: problem.problemCategory,
			problemTitle: problem.problemTitle,
			description,
			difficulty: problem.difficulty,
			tags: problem.tags,
			testcases: problem.testcases,
			templates: problem.templates
		}
		const result = await createProblem(data, adminId)
		if (result.success) {
				seed = true
		}
		
	}
}

main()
	.then(() => console.log("🌱 Seeding done!"))
	.catch((err) => console.error(err))
	.finally(async () => {
		await prisma.$disconnect();
	});
