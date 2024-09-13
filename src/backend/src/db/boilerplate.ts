import prisma from "../db/index";

interface BoilerPlateCode{
    problemId: string;
    langugageId: number;
    code: string;
}


export async function saveBoilerplateCode(boilerplatecode: BoilerPlateCode[]){
    try{
        for (const defaultCode of boilerplatecode){
            if (defaultCode.problemId){
                await prisma.defaultCode.create({
                    data: {
                        problemId: defaultCode.problemId,
                        languageId: defaultCode.langugageId,
                        code: defaultCode.code
                    }
                })
            }
        }

    }
    catch(error: any){
        console.log("Error while saving boilerplate code: ", error.message);
    }
}

