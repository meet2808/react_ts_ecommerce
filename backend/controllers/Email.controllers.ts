import Users from "../models/User.model"
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export const verifyEmail = async (req : Request, res : Response) => {
    try{
        const { token } = req.body;
        console.log("token", token)

        const user = await Users.findOne({ verifyToken : token });
        console.log(user)

        if(!user)
            return res.status(404).json({ message : "User verification is not complete.", success : false})

        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.isVerify = true;

        await user.save();

        return res.status(200).json({ message : "User verification complete.", success : true})
    }catch(error){
        console.log(error)
        return res.status(404).json({ message : "something went wrong while signup.", success : false})
    }
}