import prisma from './index'

async function createProblem(title: string, description: string, difficulty: string, userId: string){
    try {
        const res = await prisma.problem.create({
            data: {
                title,
                description,
                difficulty,
                user: {connect: {id: userId}}
            },
            select: {
                id: true
            }
        });
        return res.id;
    }
    catch(error: any){
        console.error("Error occurred while creating new problem: ", (error as Error).message);
    }
}

