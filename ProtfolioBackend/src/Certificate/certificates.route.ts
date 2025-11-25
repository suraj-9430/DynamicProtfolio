// src/Certificate/certificates.route.ts
import { Router } from "express";
import multer from "multer";
import { createCertificate, getCertificatesByEmail, ViewDownload } from "../Certificate/certificates.controllers";
import { isAuthenticated } from "../Middleware";

const router = Router();

// Memory storage to save files directly in DB
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload multiple files
router.post("/upload", upload.array("files", 20), createCertificate);

// Get certificates by email
router.get("/email/me",isAuthenticated, getCertificatesByEmail);
router.get("/:id/download",isAuthenticated,ViewDownload);


export default router;
