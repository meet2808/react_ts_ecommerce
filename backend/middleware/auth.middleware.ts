import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { conf } from "../conf"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization?.replace("Bearer ", "")
    // console.log("token", token)
    // const { userId } = req.params;

    if (!token) return res.status(401).json({ message: "No authorized request" });

    const verifiedToken = jwt.verify(token, conf.JWT_TOKEN) as JwtPayload;
    if (verifiedToken) {
        let userId = verifiedToken.id;
        // console.log(userId)
        req.params.userId = userId;
        next();
    } else {
        return res.send(401).json({ message: "No Authorized Request" });
    }
}