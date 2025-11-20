import { Router } from "express";

import {isAuthenticated} from "../Middleware"
import { login, logout, sendOtp, verifyOtp } from "./login.controllers";

const router = Router();
router.post("/login",verifyOtp);
router.post("/otp",sendOtp);
router.get("/logout",isAuthenticated,logout);
export default router;