// src/SocialMedia/socialmedia.controllers.ts
import { Request, RequestHandler, Response } from "express";
import Profile from "../models/socialmedia.model"; // reuse your existing Profile model
import { AuthRequest } from "Middleware";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// ✅ POST /api/social/save
export const saveSocialMedia = async (req: Request, res: Response) => {
  try {
    const { email, github, linkedin, twitter, resumeUrl } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    // Access files
    const files: any = req.files || {};
    const profilePic = Array.isArray(files.profilePic) ? files.profilePic[0] : undefined;
    const resumeFile = Array.isArray(files.resumeFile) ? files.resumeFile[0] : undefined;

    // Prepare data
    const payload: any = {
      github,
      linkedin,
      twitter,
      resumeUrl,
    };

    if (profilePic) {
      payload.profilePic = profilePic.buffer;
      payload.profilePicName = profilePic.originalname;
      payload.profilePicType = profilePic.mimetype;
    }

    if (resumeFile) {
      payload.resumeFile = resumeFile.buffer;
      payload.resumeFileName = resumeFile.originalname;
      payload.resumeFileType = resumeFile.mimetype;
    }

    // Upsert (update if exists, else create new)
    const existing = await Profile.findOne({ where: { email } });
    let profile: any;
    if (existing) {
      await existing.update(payload);
      profile = await Profile.findOne({ where: { email } });
    } else {
      profile = await Profile.create({ email, ...payload });
    }

    return res.status(200).json({
      status: "success",
      message: "Social media data saved successfully",
      data: {
        email: profile.email,
        github: profile.github,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        resumeUrl: profile.resumeUrl,
      },
    });
  } catch (error) {
    console.error("SaveSocialMedia error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ GET /api/social/email/:email
export const getSocialMediaByEmail = async (req: Request, res: Response) => {
  try {

    const authReq = req as AuthRequest;
    const user = authReq.user ?? authReq.identity;
    const profile = await Profile.findOne({ where: { email: user.email } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.status(200).json({
      email: profile.email,
      github: profile.github,
      linkedin: profile.linkedin,
      twitter: profile.twitter,
      resumeUrl: profile.resumeUrl,
      //   hasProfilePic: !!profile.profilePic,
      hasResumeFile: !!profile.resumeFile,
    });
  } catch (error) {
    console.error("getSocialMediaByEmail error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/social/:email/profile-pic
export const getProfilePic: RequestHandler = async (req, res) => {
  try {

    const authReq = req as AuthRequest;
    const user = authReq.user ?? authReq.identity;
    if (!user.email) return res.status(400).json({ message: "Email is required" });

    const profile = await Profile.findOne({ where: { email: user.email } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // if picture blob exists, return it
    if (profile.profilePic && Buffer.isBuffer(profile.profilePic) && profile.profilePic.length > 0) {
      const isDownload = req.query.download === "true";
      const disposition = isDownload ? "attachment" : "inline";

      res.setHeader("Content-Type", profile.profilePicType || "image/jpeg");
      res.setHeader(
        "Content-Disposition",
        `${disposition}; filename="${profile.profilePicName || "profile.jpg"}"`
      );

      return res.send(profile.profilePic);
    }

    // optional: if you stored an external URL for profile pic, redirect
    if ((profile as any).profilePicUrl) {
      return res.redirect((profile as any).profilePicUrl);
    }

    return res.status(404).json({ message: "Profile picture not found" });
  } catch (err) {
    console.error("getProfilePic error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET /api/social/:email/resume
export const getResume: RequestHandler = async (req, res) => {
  try {

    const authReq = req as AuthRequest;
    const user = authReq.user ?? authReq.identity;
    if (!user.email) return res.status(400).json({ message: "Email is required" });

    const profile = await Profile.findOne({ where: { email: user.email } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    // ✅ If resume file exists in DB
    if (profile.resumeFile && Buffer.isBuffer(profile.resumeFile) && profile.resumeFile.length > 0) {
      const isDownload = req.query.download === "true";
      const disposition = isDownload ? "attachment" : "inline";

      res.setHeader("Content-Type", profile.resumeFileType || "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `${disposition}; filename="${profile.resumeFileName || "resume.pdf"}"`
      );

      return res.send(profile.resumeFile);
    }

    // ✅ If only external resume URL exists
    if (profile.resumeUrl) {
      return res.redirect(profile.resumeUrl);
    }

    // ❌ Neither file nor URL found
    return res.status(404).json({ message: "Resume not found" });
  } catch (error) {
    console.error("getResume error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const parseResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required"
      });
    }

    // Prepare form-data for Python service
    const formData = new FormData();
    formData.append(
      "file",
      fs.createReadStream(req.file.path),
      req.file.originalname
    );

    // Call Python FastAPI
    const pythonResponse = await axios.post(
      "http://127.0.0.1:8000/parse/resume",
      formData,
      {
        headers: {
          ...formData.getHeaders()
        }
      }
    );

    // Delete temp file
    fs.unlinkSync(req.file.path);

    return res.status(200).json({
      success: true,
      parsedData: pythonResponse.data
    });

  } catch (error: any) {
    console.error("Resume parsing error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Resume parsing failed",
      error: error.message
    });
  }
};
