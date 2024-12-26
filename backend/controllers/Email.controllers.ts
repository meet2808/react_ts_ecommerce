import Users from "../models/User.model"
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

// This controller is used for verify user with email after signup
export const verifyEmail = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        console.log("token", token)

        const user = await Users.findOne({ verifyToken: token });
        console.log(user)

        if (!user)
            return res.status(404).json({ message: "User verification is not complete.", success: false })

        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.isVerify = true;

        await user.save();

        return res.status(200).json({ message: "User verification complete.", success: true })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ message: "something went wrong while signup.", success: false })
    }
}

// this controller is used for verify user emailId for forgotpassword request.
export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { token } = req.body;
        console.log("forgot password token", token);

        const user = await Users.findOne({ forgotPasswordToken: token });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "There is no user found with this forgot password request.", success: false });
        }

        user.forgotPasswordExpiry = undefined;
        user.forgotPasswordToken = undefined;
        user.isForgotPasswordVerificationCompleted = true;

        await user.save();

        return res.status(200).json({ message: "Forgot password request email verification is completed.", success: true })
    } catch (error) {
        return res.status(404).json({ message: "Error while sending the forgot password email.", success: false });
    }
}