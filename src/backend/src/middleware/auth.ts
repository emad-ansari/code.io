import jwt from "jsonwebtoken";
import { Request, Response, NextFunction} from "express";
// import { CustomRequestObject } from "../..";


export interface CustomRequestObject extends Request{
    userAuthorized: boolean;
    userId: string;
    role: string
}


const auth = async(req: Request, res: Response, next: NextFunction) =>  {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            (req as CustomRequestObject).userAuthorized = false;
            next();
        }
        // now decode the token
        else {
            jwt.verify(token, process.env.JWT_SECRET!, (err, payload) => {
                if (err || !payload){
                    return res.status(404).json({ error: err})
                }
                // here reason why you are checking the type of payload that payload may be string in case of if toke is (expired or tempered or any other error)
                if (typeof payload === 'string'){
                    return res.status(402).json({message: "payload type is string"})
                }
                (req as CustomRequestObject).userAuthorized = true;
                (req as CustomRequestObject).userId = payload.userId;
                (req as CustomRequestObject).role = payload.role;
                console.log('hi there.....')
                next();
            });
        }
    }
    catch (error: any) {
        return res.status(500).json({ error: (error as Error).message});
    }
}

export default auth;