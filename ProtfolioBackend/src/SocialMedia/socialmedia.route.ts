// src/SocialMedia/socialmedia.route.ts
import { Router } from "express";
import multer from "multer";
import { saveSocialMedia, getSocialMediaByEmail, getProfilePic, getResume } from "../SocialMedia/socialmedia.controllers";
import { isAuthenticated } from "../Middleware";

const router = Router();

// ✅ Memory storage (we'll store files in MySQL as BLOBs)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ POST — Save social media + optional files
// Expects multipart/form-data with fields:
// email, github, linkedin, twitter, resumeUrl, profilePic(file), resumeFile(file)
router.post(
  "/save",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "resumeFile", maxCount: 1 },
  ]),
  saveSocialMedia
);

// ✅ GET — Fetch social media info by email
router.get("/email/:email",  isAuthenticated,  getSocialMediaByEmail);

// ✅ GET — Fetch profile picture (view inline)
router.get("/email/:email/profile-pic", isAuthenticated,  getProfilePic);

router.get("/email/:email/resume",isAuthenticated, getResume);

export default router;
