import Users from "../models/User.model";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { conf } from "../conf";
import { sendEmail } from "../helpers/sendEmail";

export const signUp = async (req: Request, res: Response) => {
    console.log(req)
    const errors = validationResult(req);

    try {
        const fields = ["email", "password", "name"];
        const emptyFields = fields.filter(field => !req.body[field]);

        if (emptyFields.length > 0) return res.status(403).json({ error: "Please fill in all the required fields." });

        if (!errors.isEmpty()) {
            return res.status(403).json(errors)
        } else {
            let isExist = await Users.find({ email: req.body.email });

            if (isExist.length !== 0) {
                return res.status(409).json("User is already registered.")
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.password, salt);
                const userData = { ...req.body, password: hashedPassword }

                const savedUser = await Users.create(userData)

                await sendEmail({ emailId : savedUser.email, emailType : 'VERIFY', userId : savedUser._id});
                return res.status(200).json({ message : "Sign Up Successfully. Please verify your email.", user : savedUser});
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json("something went wrong while signup.")
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid email id or password" });

        const token = jwt.sign({ id: user._id, email: user.email }, conf.JWT_TOKEN);
        
        return res.status(200).json({ details: { email: user.email, id: user._id, address : user.address,access_token: token } })

    } catch (err) {
        return res.status(404).json("something went wrong while logged in.");
    }
}

export const addShippingDetails = async (req: Request, res: Response) => {
    try{
        // console.log("request params", req.params)
        // console.log("request body", req.body)
        const { residentialDetails, landmark, street, city , state, pincode} = req.body;
        const userId = req.params.userId;
        // console.log("user id in addshippingdetails", userId)
        const user = await Users.findOneAndUpdate(
            { _id : userId },
            { $set : {
                address : { residentialDetails, landmark, street, city, state, pincode }
            }},
            { new : true },
        );
        // console.log("added shipping details user", user)

        return res.status(200).json({ message : "Shipping details added successfully.", success : true, details : user })
    }catch(error){
        console.log(error)
        return res.status(404).json("something went wrong while signup.")
    }
}