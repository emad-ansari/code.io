import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

interface CustomRequestObject extends Request{
    userAuthorized: boolean;
    userId: string;
}

const auth = async(req: CustomRequestObject, res: Response, next: NextFunction) =>  {
    try {
        const token = req.headers["authorization"];
        if (!token) {
            req.userAuthorized = false;
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
                req.userAuthorized = true;
                req.userId = payload.userId;
                next();
            });
        }
    }
    catch (error: any) {
        return res.status(500).json({ error: (error as Error).message});
    }
}

export default auth;