import { DataTypes, Model } from "sequelize";
import db from "../Db/db";

class Certificate extends Model {
  declare id: number;
  declare email: string;
  declare name: string;
  declare organization: string;
  declare fileData: Buffer;   // store file content
  declare fileName: string;   // original file name
  declare fileType: string;   // MIME type
}

Certificate.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileData: {
      type: DataTypes.BLOB("long"), // long BLOB to store large files
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "certificates",
    timestamps: true,
  }
);

export default Certificate;
