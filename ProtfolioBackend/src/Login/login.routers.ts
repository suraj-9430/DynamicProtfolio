import { Router } from "express";

import {isAuthenticated} from "../Middleware"
import { login, sendOtp, verifyOtp } from "./login.controllers";

const router = Router();
router.post("/login",verifyOtp);
router.post("/otp",sendOtp);
export default router;