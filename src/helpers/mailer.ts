import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

interface EmailProps {
    email: string;
    emailType: 'VERIFY' | 'RESET';
    userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: EmailProps) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10)


        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })

        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 3600000 })
        }

        const transporter = nodemailer.createTransport({
            
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.SANDBOX_AUTH_USER,
                    pass: process.env.SANDBOX_AUTH_PASS
                }
        })


        const mailOptions = {
            from: "kartik@outlook.in",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify email' : 'Reset your password',
            html: `<p>Click <a href="${process.env.DOMAIN_NAME}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN_NAME}/${emailType === "VERIFY" ? "verifyemail" : "reset-password"}?token=${hashedToken}
            </p><h1>Please complete your ${emailType === "VERIFY" ? "email verification" : "password reset"} within the next hour.</h1>
            <h1>Important: If you are first time verifying your email,Verify before log in, also please check your spam folder for the verification email.</h1>`
        }

        const mailresponse = await transporter.sendMail(mailOptions)
        return mailresponse

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(errorMessage);
    }
}