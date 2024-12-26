import Users from "../models/User.model";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { conf } from "../conf";
import { sendEmail } from "../helpers/sendEmail";

// controller for user signup and registration process
export const signUp = async (req: Request, res: Response) => {
    // console.log(req)
    const errors = validationResult(req);

    try {
        const fields = ["email", "password", "name"];
        const emptyFields = fields.filter(field => !req.body[field]);

        if (emptyFields.length > 0) return res.status(403).json({ message : "Please fill in all the required fields." });

        if (!errors.isEmpty()) {
            return res.status(403).json(errors)
        } else {
            let isExist = await Users.find({ email: req.body.email });

            if (isExist.length !== 0) {
                return res.status(409).json({message : "This email is already registered.", success : false })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const userData = { ...req.body, password: hashedPassword }

                const savedUser = await Users.create(userData)

                const mailRes = await sendEmail({ emailId: savedUser.email, emailType: 'VERIFY', userId: savedUser._id });
                // console.log("mail response", mailRes);
                return res.status(200).json({ message: "Sign Up Successfully. Please verify your email.", user: savedUser, success : true });
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json("something went wrong while signup.")
    }
}

// controller for requesting the forgot password, and it will send the forgot password verification email on given email address
export const reqForgotPassword = async (req: Request, res: Response) => {
    try {
        const verificationEmail = req.body.email; // email address on which we send the forgot password verification email

        // first we check that the any user register with this email or not
        const user = await Users.findOne({ email: verificationEmail });

        if (!user) {
            return res.status(404).json({ message: "There is no user is registerd with this email address.", success: false });
        }

        const mailRes = await sendEmail({ emailId: verificationEmail, emailType: 'RESET', userId: null });
        // console.log("mail response", mailRes);
        return res.status(200).json({ message: "Forgot password verificaiton email is send to this email, go and verify the email address. If the email is not in the inbox so please kindly check your spam folder.", success : true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error occured while requesting for the forgot password.", success: false });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid email id or password" });

        const token = jwt.sign({ id: user._id, email: user.email }, conf.JWT_TOKEN);

        return res.status(200).json({ details: { email: user.email, id: user._id, address: user.address, access_token: token } })

    } catch (err) {
        return res.status(404).json("something went wrong while logged in.");
    }
}

export const addShippingDetails = async (req: Request, res: Response) => {
    try {
        const { residentialDetails, landmark, street, city, state, pincode } = req.body;
        const userId = req.params.userId;
        const user = await Users.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    address: { residentialDetails, landmark, street, city, state, pincode }
                }
            },
            { new: true },
        );
        // console.log("added shipping details user", user)

        return res.status(200).json({ message: "Shipping details added successfully.", success: true, details: user })
    } catch (error) {
        console.log(error)
        return res.status(404).json("something went wrong while signup.")
    }
}

// controller used for change password after completing the forgot password request email verification
export const changePassword = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPassword = hashedPassword;

        // find the user with given email id and update the password
        const user = await Users.findOneAndUpdate(
            { email },
            { $set: { password : newPassword, isForgotPasswordVerificationCompleted : false } },
            { new: true }
        );

        // console.log("forgot password user", user);
        return res.status(200).json({ message: "Password updated successfully.", success: true });
    } catch (error) {
        return res.status(500).json({ message: "something went wrong while signup.", success: false });
    }
}