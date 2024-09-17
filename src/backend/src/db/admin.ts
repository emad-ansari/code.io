import prisma from "../db/index";




export async function createAdmin (username: string, email: string, password: string): Promise<{ success: boolean, msg: string}> {
   try {
        const newAdmin = await prisma.admin.create({
            data: {
                username,
                email,
                password
            },
            select: {
                id: true
            }
        })
        if (newAdmin){
            console.log("admin reated successfully");
            return {
                success: true,
                msg: "admin reated successfully"
            }
        }
        else {
            return {
                success: false,
                msg: "Not able to create admin"    
            }
        }

    }
    catch(error: any){
        return {
            success: false,
            msg: error.message    
        }
    }
}