import { Router } from "express";

import {isAuthenticated} from "../Middleware"
import { login } from "./login.controllers";

const router = Router();
router.post("/login",login)
export default router;