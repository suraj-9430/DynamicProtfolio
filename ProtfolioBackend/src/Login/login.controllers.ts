import { Request, Response } from "express";
import CommonService from "../ORM/common.service";   // ✅ go up one, then into ORM
import { autentication, random } from "../helper";
import UserInfo from "../models/userinfo.model";

const tableName = "userinfo";



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
       maxAge:  30*60*1000, 
       secure: process.env.NODE_ENV === 'production',
    });

    return res.status(200).json({
      message: "Login successfully",
      user:user.SessionToken
    });
  } catch (err: any) {
    console.error("Login error:", err);
    return res.status(500).json({ error: err.message });
  }
};