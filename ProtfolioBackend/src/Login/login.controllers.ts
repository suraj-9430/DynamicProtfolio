import { Request, Response } from "express";
import CommonService from "../ORM/common.service";   // ✅ go up one, then into ORM
import { autentication, random } from "../helper";
import UserInfo from "../models/userinfo.model";
import { transporter } from "./otpsend";

const tableName = "userinfo";
let otpStore: any = {};



export const login = async (req: Request, res: Response) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email or Password not filled" });
    }

    const user = await CommonService.findByEmail(tableName, email);
    if (!user) {
      res.clearCookie("SURAJ-AUTH");
      return res.status(404).json({ message: "Email Not Found" });
    }

    const expectedHash = autentication(user.salt, password);
    if (user.password !== expectedHash) {

      res.clearCookie("SURAJ-AUTH");
      return res.status(401).json({ message: "Password is Incorrect" });
    }

    const salt = random();
    user.SessionToken = autentication(salt, user.id.toString());
    await user.save();

    res.cookie("SURAJ-AUTH", user.SessionToken, {
      httpOnly: true,
      sameSite: "lax",
      // secure: false ,// use true only with HTTPS
      maxAge: 30 * 60 * 1000,
      secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      message: "Login successfully",
      user: user.SessionToken
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
};


export const sendOtp = async (req: Request, res: Response) => {


  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email or Password not filled" });
  }
  const user = await CommonService.findByEmail(tableName, email);
  if (!user) {
    res.clearCookie("SURAJ-AUTH");
    return res.status(404).json({ message: "Email Not Found" });
  }
  const expectedHash = autentication(user.salt, password);
  if (user.password !== expectedHash) {

    res.clearCookie("SURAJ-AUTH");
    return res.status(401).json({ message: "Password is Incorrect" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = {

    otp,

    expiresAt: Date.now() + 2 * 60 * 1000

  };

  await transporter.sendMail({
    to: email,
    subject: "Your Login OTP",
    html: `<p>Hello ${user.name},</br>
    <p>Thank you for choosing this Portfolio.</p></br><h3>Your OTP is <b>${otp}</b>. Valid for 2 minutes.</h3></br><p>Just one more step before you get started.</p>`
  });
  res.json({ message: "OTP sent to email" });
};


export const verifyOtp = async (req: Request, res: Response) => {

  const { email, password, otp } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email or Password not filled" });
  }
  const user = await CommonService.findByEmail(tableName, email);
  if (!user) {
    res.clearCookie("SURAJ-AUTH");
    return res.status(404).json({ message: "Email Not Found" });
  }
  const expectedHash = autentication(user.salt, password);
  if (user.password !== expectedHash) {

    res.clearCookie("SURAJ-AUTH");
    return res.status(401).json({ message: "Password is Incorrect" });
  }

  const otpData = otpStore[email];

  if (!otpData) {

    return res.status(400).json({ error: "OTP not found or expired" });

  }
  // Expired?
  if (Date.now() > otpData.expiresAt) {

    delete otpStore[email];

    return res.status(400).json({ error: "OTP expired" });

  }

  // Wrong OTP?

  if (otpData.otp !== otp) {

    return res.status(400).json({ error: "Invalid OTP" });

  }

  const salt = random();
  user.SessionToken = autentication(salt, user.id.toString());
  await user.save();
  delete otpStore[email];

  res.cookie("SURAJ-AUTH", user.SessionToken, {
    httpOnly: true,
    sameSite: "lax",
    // secure: false ,// use true only with HTTPS
    maxAge: 30 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  });

  return res.status(200).json({
    message: "Login successfully",
    user: user.SessionToken
  });

};


export const logout= async(req:Request,res:Response)=>{
  
  res.clearCookie("SURAJ-AUTH")
  return res.status(200).json({ message:"logout successfully" });


}

