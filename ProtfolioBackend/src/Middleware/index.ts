import { NextFunction, Request, Response } from "express";
import { merge } from "lodash";
import CommonService from "../ORM/common.service";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.cookies["SURAJ-AUTH"];

    if (!sessionToken) {
      return res.status(401).json({ message: "Not authenticated — please log in." });
    }

    const existingUser = await CommonService.getbySessionToken("userinfo", sessionToken);

    if (!existingUser) {
      return res.status(401).json({ message: "Invalid or expired session token." });
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Server error during authentication." });
  }
};
