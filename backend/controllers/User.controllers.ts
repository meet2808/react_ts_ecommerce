import Users from "../models/User.model";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { conf } from "../conf";

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
                return res.status(200).json(savedUser)
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

        return res.status(200).json({ details: { email: user.email, id: user._id, access_token: token } })

    } catch (err) {
        return res.status(404).json("something went wrong while logged in.");
    }
}