"use strict";
// import prisma from "../db/index";
// import bcrypt from 'bcrypt'
// export async function createAdmin (username: string, email: string, password: string): Promise<{ success: boolean, msg: string}> {
//    try {
//         // hash the password 
//         const hashedPassword = await bcrypt.hash(password, 10)
//         const newAdmin = await prisma.admin.create({
//             data: {
//                 username,
//                 email,
//                 password: hashedPassword
//             },
//             select: {
//                 id: true
//             }
//         })
//         if (newAdmin){
//             console.log("admin reated successfully");
//             return {
//                 success: true,
//                 msg: "admin reated successfully"
//             }
//         }
//         else {
//             return {
//                 success: false,
//                 msg: "Not able to create admin"    
//             }
//         }
//     }
//     catch(error: any){
//         return {
//             success: false,
//             msg: error.message    
//         }
//     }
// }
// export async function findAdmin (email: string, password: string): Promise<{ success: boolean, msg: string, adminId?: string}>{
//     try {   
//         const admin = await prisma.admin.findFirst({
// 			where: {
// 				email
// 			},
// 			select: {
// 				password: true,
//                 id: true
// 			}
// 		})
// 		if (!admin){
// 			return {
//                 success: false,
//                 msg: "Admin Not found"
//             }
// 		}
// 		else {
// 			// match the password
// 			// so first need to decrypt it
// 			const matchPassword = await bcrypt.compare(password, admin.password)
//             if (matchPassword){
//                 return {
//                     success: true,
//                     msg: "Admin found",
//                     adminId: admin.id
//                 }
//             }
//             else {
//                 return {
//                     success: false,
//                     msg: "Password does not match"
//                 }
//             }
// 		}
//     }
//     catch(error: any){
//         return {
//             success: false,
//             msg: error.message
//         }
//     }
// }
