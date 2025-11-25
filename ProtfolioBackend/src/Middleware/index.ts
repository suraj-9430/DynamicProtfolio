import { NextFunction, Request, Response } from "express";
import CommonService from "../ORM/common.service";

/**
 * Extend Request with identity/user (TypeScript-friendly)
 */
export interface AuthRequest extends Request {
  identity?: any;
  user?: any;
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as AuthRequest;

  try {
    // 1) Support token from cookie OR Authorization header (Bearer)
    const sessionToken =
      req.cookies?.["SURAJ-AUTH"] ||
      (() => {
        const h = req.headers?.authorization;
        if (!h) return undefined;
        const parts = h.split(" ");
        if (parts.length === 2 && parts[0].toLowerCase() === "bearer") return parts[1];
        return undefined;
      })();

    if (!sessionToken) {
      return res.status(401).json({ message: "Not authenticated — please log in." });
    }

    // 2) Find user by session token
    const existingUser = await CommonService.getbySessionToken("userinfo", sessionToken);

    // 3) If token is invalid or expired, clear cookie and return 401
    if (!existingUser) {
      // Clear httpOnly cookie (client JS cannot)
      try {
        res.clearCookie("SURAJ-AUTH", COOKIE_OPTIONS);
      } catch (e) {
        // ignore cookie clear errors, but log for debug
        console.warn("clearCookie failed:", e);
      }
      return res.status(401).json({ message: "Invalid or expired session token." });
    }

    // 4) Attach user identity to request (both .identity and .user for compatibility)
    authReq.identity = existingUser;
    authReq.user = existingUser;

    return next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Server error during authentication." });
  }
};
