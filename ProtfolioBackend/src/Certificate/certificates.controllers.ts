// src/Certificate/certificates.controllers.ts
import { Request, Response } from "express";
import Certificate from "../models/certificate.model";



const createCertificate = async (req: Request, res: Response) => {
    try {
        const files = Array.isArray(req.files) ? req.files : Object.values(req.files || {}).flat();
        const { email } = req.body;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "Files are required" });
        }

        const savedCertificates = [];

        for (const file of files) {
            const cert = await Certificate.create({
                email,
                name: req.body[`name_${file.originalname}`] || "Unknown",
                organization: req.body[`organization_${file.originalname}`] || "Unknown",
                fileData: file.buffer,
                fileName: file.originalname,
                fileType: file.mimetype,
            });
            savedCertificates.push(cert);
        }

        return res.status(200).json({
            status: "success",
            data: savedCertificates,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};


const getCertificatesByEmail = async (req: Request, res: Response) => {
    try {
        const { email } = req.params;
        const certs = await Certificate.findAll({ where: { email } });
        res.status(200).json({ data: certs });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
const ViewDownload= async (req: Request, res: Response) => {
  try {
    const cert = await Certificate.findByPk(req.params.id);
    if (!cert) return res.status(404).send("Certificate not found");

    res.setHeader("Content-Type", cert.fileType);
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${cert.fileName}"`
    );

    // Send the binary file data from MySQL
    res.send(cert.fileData);
  } catch (err) {
    console.error("❌ Error fetching file:", err);
    res.status(500).send("Server error");
  }
};

export { createCertificate, getCertificatesByEmail,ViewDownload };
