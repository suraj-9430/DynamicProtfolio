import { Router } from "express";
import {isAuthenticated} from "../Middleware"
import { Create, getData } from "./project.controllers";

const router = Router();

router.post("/pcreate",Create );
router.get("/email/me",isAuthenticated,getData);

export default router;
