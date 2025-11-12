import { Router } from "express";
import {isAuthenticated} from "../Middleware"
import { Create, Getdata } from "./workexp.contollers";

const router = Router();

router.post("/workrec",Create );
router.get("/email/:email",isAuthenticated,Getdata);

export default router;
