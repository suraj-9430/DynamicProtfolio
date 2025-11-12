import { Router } from "express";
import { userCreate, getUsers, getByEmail } from "./userinfo.controllers";   // ✅ same folder
import {isAuthenticated} from "../Middleware"

const router = Router();

router.post("/createrec", userCreate);
router.get("/getall",isAuthenticated, getUsers);
router.get("/email/:email",isAuthenticated,getByEmail);

export default router;
