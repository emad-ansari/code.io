import prisma from ".";
import bcrypt from 'bcrypt'




export async function createUser (username: string, email: string, password: string): Promise<{ success: boolean, msg: string}> {
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username, 
                email,
                password: hashedPassword
            }
        })
        if (newUser){
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

export async function findUser (email: string, password: string): Promise<{ success: boolean, msg: string, userId?: string}> {
    try {   
        const user = await prisma.admin.findFirst({
			where: {
				email
			},
			select: {
				password: true,
                id: true
			}
		})
		if (!user){
			return {
                success: false,
                msg: "User Not found"
            }
		}
		else {
			// match the password
			// so first need to decrypt it
			const matchPassword = await bcrypt.compare(password, user.password)
            if (matchPassword){
                return {
                    success: true,
                    msg: "User found",
                    userId: user.id
                }
            }
            else {
                return {
                    success: false,
                    msg: "Incorrect Password!!"
                }
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