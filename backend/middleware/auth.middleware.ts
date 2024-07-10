import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { conf } from "../conf"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.replace("Bearer ", "")
    // const { userId } = req.params;

    if (!token) return res.status(401).json({ message: "No authorized request" });

    const verifiedToken = jwt.verify(token, conf.JWT_TOKEN) as JwtPayload;
    if (verifiedToken) {
        let userId = verifiedToken.id;
        console.log(userId)
        next();
    } else {
        return res.send(401).json({ message: "No Authorized Request" });
    }
}