// src/models/profile.model.ts
import { Model, DataTypes } from "sequelize";
import db from "../Db/db";

class socialmedia extends Model {
  declare id: number;
  declare email: string;          // link profile to user
  declare github?: string;
  declare linkedin?: string;
  declare twitter?: string;
  declare resumeUrl?: string;

  // binary fields
  declare profilePic?: Buffer | null;
  declare profilePicType?: string | null;
  declare profilePicName?: string | null;

  declare resumeFile?: Buffer | null;
  declare resumeFileType?: any;
  declare resumeFileName?: string | null;
}

socialmedia.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },

    // associate with user
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true, // optional: one profile per email
    },

    github: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resumeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Profile picture stored as BLOB
    profilePic: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    profilePicName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profilePicType: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // Resume file stored as BLOB
    resumeFile: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    resumeFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resumeFileType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "socialmedia",
    timestamps: true,
    underscored: false,
  }
);

export default socialmedia;
