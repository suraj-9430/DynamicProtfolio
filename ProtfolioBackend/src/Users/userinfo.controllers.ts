import { Request, Response } from "express";
import CommonService from "../ORM/common.service";   // ✅ go up one, then into ORM
import { autentication, random } from "../helper";
import UserInfo from "../models/userinfo.model";

const tableName = "userinfo";


const userCreate = async (req: Request, res: Response) => {
  try {
    // console.log("📦 Incoming body:", req.body); 
    const { name, email, role, password, contact, address, about, currposition, company } = req.body;


    if (!email || !password || !name) {
      return res.status(401).json({ message: "Email or Name or Password not filled" });
    }

    const emailUser = await CommonService.findByEmail(tableName, email);
    if (emailUser) {
      return res.status(402).json({ message: "Email already exists" });
    }

    const salt = random();
    const newUser = await UserInfo.create({
      name,
      email,
      password: autentication(salt, password),
      contact,
      address,
      role,
      about,
      currposition,
      company,
      salt
    });

    return res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });


  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};


const getUsers = async (_req: Request, res: Response) => {
  try {
    const result = await CommonService.findAll(tableName);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

const getByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email; // ✅ just the string
    const result = await CommonService.findByEmail(tableName, email);

    if (result) {
      // remove sensitive fields
      const safe={
        id:result.id,
        name:result.name,
        email:result.email,
        about:result.about,
        company:result.company,
        currposition:result.currposition,
        role:result.role,
        contact:result.contact
      }
      return res.status(200).json({ data: safe, status: "success" });
    }


    return res.status(404).json({ message: "User not found" });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}

export {
  userCreate,
  getUsers,
  getByEmail,
};
