import { Router } from "express";
import userRouter from "../Users/userinfo.routes";   // ✅ relative path
import login from "../Login/login.routers";
import workexp from "../WorkExp/workexp.routes"
import project from "../Project/project.router"
import certificateRoutes from "../Certificate/certificates.route"
import socialmedia from "../SocialMedia/socialmedia.route";


const router = Router();
router.use("/api/userinfo", userRouter);
router.use("/api/workexp",workexp);
router.use("/api/project",project);
router.use("/api/certificates", certificateRoutes);
router.use("/api/socialmedia",socialmedia)
router.use("/api",login );


export default router;
