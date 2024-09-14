import prisma from "../db/index";

interface BoilerPlateCode {
	problemId: string;
	boilerplateCodes: {
		languageId: number;
		code: string;
	}[];
}

export async function createBoilerplateCode({
	problemId,
	boilerplateCodes,
}: BoilerPlateCode) {
	if (!problemId || boilerplateCodes.length === 0) {
		console.log("Invalid input: problemId or boilerplateCodes is missing.");
		return;
	}
	try {
		if (problemId) {
			for (const defaultCode of boilerplateCodes) {
				await prisma.defaultCode.create({
					data: {
						problemId,
						languageId: defaultCode.languageId,
						code: defaultCode.code,
					},
				});
			}
		}
	} catch (error: any) {
		console.log("Error while saving boilerplate code: ", error.message);
	}
}
