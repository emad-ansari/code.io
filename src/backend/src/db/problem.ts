import prisma from './index'

export async function createProblem(title: string, description: string, difficulty: string, userId: string): Promise<{ success: boolean; msg: string; id: string; }>{
    try {
        // you need to generate a new problem no
        const lastProblem = await prisma.problem.findFirst({
            orderBy: {
                problemNo: 'desc',
            },
            select: {
                problemNo: true,
            },
        });
        let newProblemNo: number = 1;

        if (lastProblem !== null){
            newProblemNo = lastProblem.problemNo + 1;
        }
        // if problem with the given title does not exist then only create the problem 
        const isTitleExist = await prisma.problem.findUnique({
            where: {
                title: title
            },
            select: {
                id: true
            }
        });

        if (isTitleExist){
            return {
                success: true,
                msg: `problem already exist with the ${title}`,
                id: isTitleExist.id
            }

        }
        const res = await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                problemNo: newProblemNo,
                createdBy: userId
            },
            select: {
                id: true
            }
        });

        return {
            success: true,
            msg: "problem created successfully",
            id: ""
        }
    }
    catch(error: any){
        console.error("Error occurred while creating new problem: ", (error as Error).message);
        return {
            success: false,
            msg: error.message,
            id: ''
        }
    }
}



