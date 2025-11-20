import nodemailer from "nodemailer";

 
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:process.env.EMAIL_USER as string,
        pass:process.env.EMAIL_PASS as string
    }
});
