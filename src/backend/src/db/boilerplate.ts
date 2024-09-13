import prisma from "../db/index";

interface BoilerPlateCode {
	problemId: string;
	boilerplatecodes: {
		langugageId: number;
		code: string;
	}[];
}

export async function saveBoilerplateCode({
	problemId,
	boilerplatecodes,
}: BoilerPlateCode) {
	try {
		if ( problemId ) {
			for (const defaultCode of boilerplatecodes) {
				await prisma.defaultCode.create({
					data: {
						problemId,
						languageId: defaultCode.langugageId,
						code: defaultCode.code,
					},
				});
			}
		}
	} catch (error: any) {
		console.log("Error while saving boilerplate code: ", error.message);
	}
}

const LNAGUAGE_MAPPING = {
	js: { name: "javascript", languageId: 1 },
	cpp: { name: "cpp", languageId: 2 },
	typescript: { name: "typescript", languageId: 3 },
	java: { name: "java", languageId: 4 },
	python: { name: "python", languageId: 5 },
};
