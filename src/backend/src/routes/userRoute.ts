import { Prisma } from '@prisma/client';
import { Request, Response, Router } from 'express'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import prisma from '../db';
import { createUser, findUser } from '../db/user';
const router = Router();

const UserSignupInput = z.object({
  username: z.string().min(5).max(20),
  email: z.string().email(),
  password: z.string().min(5).max(20)
})

const UserLoginInput = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(20)
})



router.post('/signup', async (req: Request, res: Response ) => {
  const parsedInput = UserSignupInput.safeParse(req.body);
  if (!parsedInput.success){
    return res.status(400).json({ err: parsedInput.error });
  }
  try {
    const { username, email, password} = parsedInput.data;
    // check if user already exist or not
    const user = await prisma.user.findFirst({
      where: {
        email
      }
    })
    if (user){
      return res.json({ err: "User already exist"});
    }
    // otherwise user don't exist then create new user
    const newUser = await createUser(username, email, password);
    if (!newUser.success){
      return res.json({ err: newUser.msg});
    }
    return res.status(200).json({ msg: "User created successfully"});
    
  }
  catch(error: any){
    console.error(error.message);
    return res.status(500).json({err: error.message});
  }
})


router.post('/login', async (req: Request, res: Response ) => {
  const parsedInput = UserLoginInput.safeParse(req.body);
  if (!parsedInput.success){
    return res.status(400).json({ err: parsedInput.error });
  }
  try {
    const { email, password } = parsedInput.data;
    // check if user exist or not
    const userExist = await findUser(email, password);
    if (!userExist.success){
      return res.json({ err: userExist.msg});
    }
    const token = jwt.sign({ userId: userExist.userId, role: "user" } , process.env.JWT_SECRET!, { expiresIn: '1d'} )
		return res.status(201).json({ msg: 'login successfully' ,  token: token })
  }
  catch(error: any){
    console.error(error.message);
    return res.status(500).json({err: error.message});
  }
})


export default router;





/*
  - How to check the user is Admin or not while creating a new User?
  
  - while creating a new user set the isAdmin and userId property to jwt token
  - user: {userId: string, isAdmin: boolean}
*/