import { Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'
import prisma from '../db';
import { createUser, findUser } from '../db/user';
import { LoginInput, SignUpInput } from '../@utils/types';
const router = Router();


router.post('/signup', async (req: Request, res: Response ) => {
  
  const parsedInput = SignUpInput.safeParse(req.body.data);
  console.log('request heree.')
  if (!parsedInput.success){
    console.log('inside if else: ', parsedInput.error)
    return res.status(400).json({ success: false, msg: parsedInput.error });
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
      return res.json({ success: false, msg: "User already exist"});
    }
    // otherwise user don't exist then create new user
    const newUser = await createUser(username, email, password);
    if (!newUser.success){
      return res.json({ success: newUser.success, msg: newUser.msg});
    }
    return res.status(200).json({ success: true, msg: "User created successfully"});
    
  }
  catch(error: any){
    console.error(error.message);
    return res.status(500).json({success: false, msg: error.message});
  }
})


router.post('/login', async (req: Request, res: Response ) => {
  const parsedInput = LoginInput.safeParse(req.body.data);
  if (!parsedInput.success){
    return res.status(400).json({ success: false, msg: parsedInput.error });
  }
  try {
    const { email, password } = parsedInput.data;
    // check if user exist or not
    const userExist = await findUser(email, password);
    if (!userExist.success){
      return res.json({ success: false, msg: userExist.msg});
    }
    const token = jwt.sign({ userId: userExist.userId, role: "user" } , process.env.JWT_SECRET!, { expiresIn: '1d'} )
		return res.status(201).json({ success: true, msg: 'login successfully' ,  token: token })
  }
  catch(error: any){
    console.error(error.message);
    return res.status(500).json({success: false, msg: error.message});
  }
})


export default router;
