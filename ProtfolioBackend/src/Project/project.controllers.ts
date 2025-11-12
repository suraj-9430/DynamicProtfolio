import { Request, Response } from "express";
import CommonService from "../ORM/common.service";

const tableName = "project";

const Create = async (req: Request, res: Response) => {
  try {
    const { projects, email } = req.body; // expecting { projects: [...], email: 'user@example.com' }

    if (!projects || !Array.isArray(projects) || projects.length === 0 || !email) {
      return res.status(400).json({ message: "No projects to save" });
    }
    const savedProjects = [];
    for (const project of projects) {
      const result = await CommonService.create(tableName, {
        ...project,
        email, // link project to user
      });
      savedProjects.push(result);
    }

    return res.status(201).json({
      status: "success",
      message: "All projects saved successfully",
      data: savedProjects,
    });

  } catch (error: any) {
    console.error("Error saving projects:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
};

const getData = async (req: Request, res: Response) => {
  try {
    const email = req.params.email; // ✅ just the string
    const result = await CommonService.findAllByEmail(tableName, email);
    if (result) {
      return res.status(200).json({ message: "success", data: result })
    }
    return res.status(404).json({ message: "User not found" });

  } catch (err:any) {
    return res.status(500).json({ error: err.message });

  }
}

export {
  Create,
  getData,
};
