// models/WorkExp.ts
import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import db from "../Db/db";

interface WorkExpAttributes {
  id: number;
  email: string;
  cabout1?: string | null;
  cabout2?: string | null;
  cabout3?: string | null;
  cabout4?: string | null;
  currcompany1?: string | null;
  currcompany2?: string | null;
  currcompany3?: string | null;
  currcompany4?: string | null;
  role1?: string | null;
  role2?: string | null;
  role3?: string | null;
  role4?: string | null;
  duration1?: string | null;
  duration2?: string | null;
  duration3?: string | null;
  duration4?: string | null;
}

interface WorkExpCreationAttributes extends Optional<WorkExpAttributes, "id"> {}

class WorkExp extends Model<WorkExpAttributes, WorkExpCreationAttributes>
  implements WorkExpAttributes {
  declare id: number;
  declare email: string;
  declare cabout1: string | null;
  declare cabout2: string | null;
  declare cabout3: string | null;
  declare cabout4: string | null;
  declare currcompany1: string | null;
  declare currcompany2: string | null;
  declare currcompany3: string | null;
  declare currcompany4: string | null;
  declare role1: string | null;
  declare role2: string | null;
  declare role3: string | null;
  declare role4: string | null;
  declare duration1: string | null;
  declare duration2: string | null;
  declare duration3: string | null;
  declare duration4: string | null;

  static associate(models: any) {
    // Example association without creating DB-level FK constraints/indexes automatically:
    // models.SomeOtherModel.hasMany(WorkExp, { foreignKey: "userEmail", sourceKey: "email", constraints: false });
    //
    // If you need referential integrity, create the FK via migrations explicitly rather than relying on sync({ alter: true }).
  }
}

WorkExp.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
      // DO NOT set unique: true here — a user may have multiple work experience rows.
    },
    cabout1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cabout2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cabout3: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cabout4: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    currcompany1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currcompany2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currcompany3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currcompany4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role3: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role4: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    duration1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    duration2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    duration3: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    duration4: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  },
  {
    sequelize: db as Sequelize,
    tableName: "workexp",
    timestamps: false,
    // Explicit indexes only — keep minimal to avoid hitting the 64-index limit.
    indexes: [
      {
        name: "idx_workexp_email",
        unique: false,
        fields: ["email"]
      }
      // Add other composite indexes here *only if* you need them for queries.
    ]
  }
);

export default WorkExp;
