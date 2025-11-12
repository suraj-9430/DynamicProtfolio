import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import db from "../Db/db";

interface SocialMediaAttributes {
  id: number;
  email: string;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  resumeUrl?: string | null;
  profilePic?: Buffer | null;
  profilePicType?: string | null;
  profilePicName?: string | null;
  resumeFile?: Buffer | null;
  resumeFileType?: string | null;
  resumeFileName?: string | null;
}

interface SocialMediaCreationAttributes extends Optional<SocialMediaAttributes, "id"> {}

class SocialMedia extends Model<SocialMediaAttributes, SocialMediaCreationAttributes>
  implements SocialMediaAttributes {
  declare id: number;
  declare email: string;
  declare github: string | null;
  declare linkedin: string | null;
  declare twitter: string | null;
  declare resumeUrl: string | null;
  declare profilePic: Buffer | null;
  declare profilePicType: string | null;
  declare profilePicName: string | null;
  declare resumeFile: Buffer | null;
  declare resumeFileType: string | null;
  declare resumeFileName: string | null;
}

SocialMedia.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      // ❌ do NOT use unique: true here
      // we’ll define the unique constraint below explicitly
    },
    github: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resumeUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    profilePic: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    profilePicName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    profilePicType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    resumeFile: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    resumeFileName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    resumeFileType: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    sequelize: db as Sequelize,
    tableName: "socialmedia",
    timestamps: true,
    underscored: false,
   
    indexes: [
      {
        name: "uniq_social_email",
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default SocialMedia;
