import prisma from "../db/index";

interface BoilerPlateCode {
	problemId: string;
	boilerplatecodes: {
		languageId: number;
		code: string;
	}[];
}

export async function createBoilerplateCode({
	problemId,
	boilerplatecodes,
}: BoilerPlateCode) {
	try {
		if ( problemId ) {
			for (const defaultCode of boilerplatecodes) {
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

