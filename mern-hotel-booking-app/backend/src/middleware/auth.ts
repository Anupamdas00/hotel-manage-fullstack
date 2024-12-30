import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            userId : string
        }
    }
}

const validateToken = (req : Request, res : Response, next : NextFunction) => {
    const token = req.cookies.auth_token;
    
    if(!token){
        return res.status(401).json({ message : "unauthorized" })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET_key as string)
        req.userId = (decoded as JwtPayload).userId
        next()
    }catch(error){
        res.status(401).send({message : 'unauthorize'})
    }
}

export default validateToken;