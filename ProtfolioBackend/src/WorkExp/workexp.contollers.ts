import { Request, Response } from "express";
import CommonService from "../ORM/common.service";   // ✅ go up one, then into ORM
import UserInfo from "../models/userinfo.model";
import { AuthRequest } from "Middleware";

const tableName = "workexp";
const Create = async (req: Request, res: Response) => {
  try {
    // console.log("📦 Incoming body:", req.body); 

    const { email } = req.body




    if (!email) {
      return res.status(401).json({ message: "Email not filled" });
    }

    const emailUser = await CommonService.findByEmail(tableName, email);
    if (emailUser) {
      return res.status(402).json({ message: "Email already exists" });
    }

    // const salt = random();
    // const newUser = await UserInfo.create({
    //   name,
    //   email,
    //   password: autentication(salt, password),
    //   contact,
    //   address,
    //   role,
    //   about,
    //   currposition,
    //   company,
    //   salt
    // });

    const result = await CommonService.create(tableName, req.body)

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: result
    });

  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

const Getdata = async (req: Request, res: Response) => {
  try {
    // const email = req.params.email;
    // const email = req.user.email;
    const authReq = req as AuthRequest;
    const user = authReq.user ?? authReq.identity;

    const result = await CommonService.findByEmail(tableName, user.email)
    if (result) {
      return res.status(200).json({ data: result, status: "success" })
    }
    else {
      return res.status(402).json({ message: "Email not exist" })
    }

  } catch (error:any) {
     return res.status(500).json({ error: error.message });

  }

}

export {
  Create,
  Getdata
}