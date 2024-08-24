import Users  from "../models/User.model";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { conf } from "../conf";

interface EMAIL_TYPE {
    emailId: string;
    emailType: string;
    userId: any;
}

export const sendEmail = async ({ emailId, emailType, userId }: EMAIL_TYPE) => {
    try {
        // const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const hashedToken = jwt.sign({ emailId }, conf.EMAIL_TOKEN_SECRET);

        switch (emailType) {
            case "VERIFY":
                await Users.findByIdAndUpdate(userId, {
                    $set: {
                        verifyToken: hashedToken,
                        verifyTokenExpiry: Date.now() + 3600000
                    }
                })
                break;

            case "RESET":
                await Users.findByIdAndUpdate(userId, {
                    $set: {
                        forgotPasswordToken: hashedToken,
                        forgotPasswordExpiry: Date.now() + 3600000
                    }
                })
                break;

            default:
                break;
        }

        const transport = nodemailer.createTransport({
            service : "gmail",
            auth: {
                user: conf.GMAIL,
                pass: conf.GMAIL_PASSWORD
            }
        });

        const emailBody = `<p>
            Click <a href="http://localhost:5173/verifyemail?token=${hashedToken}">here</a> to ${emailType == "VERIFY" ? "VERIFY YOUR EMAIL" : "RESET YOUR PASSWORD"}
            or copy and paste the below link in your browser.<br />http://localhost:5173/verifyemail?token=${hashedToken}
        </p>`

        const mailOptions = {
            from: conf.GMAIL,
            to: `${emailId}`,
            subject: emailType == "VERIFY" ? "PRODUCTMART User verification" : "Reset your password email",
            html: emailBody,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message)
    }
}