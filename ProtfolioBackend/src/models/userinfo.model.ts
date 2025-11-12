// models/UserInfo.ts
import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import db from "../Db/db";

// If you use TS strict models, define attribute interfaces
interface UserInfoAttributes {
  id: number;
  name: string;
  password: string;
  contact: string;
  address?: string | null;
  email: string;
  about?: string | null;
  company?: string | null;
  currposition?: string | null;
  role?: string | null;
  salt?: string | null;
  SessionToken?: string | null;
}

interface UserInfoCreationAttributes extends Optional<UserInfoAttributes, "id"> {}

class UserInfo extends Model<UserInfoAttributes, UserInfoCreationAttributes>
  implements UserInfoAttributes {
  declare id: number;
  declare name: string;
  declare password: string;
  declare contact: string;
  declare address: string | null;
  declare email: string;
  declare about: string | null;
  declare company: string | null;
  declare currposition: string | null;
  declare role: string | null;
  declare salt: string | null;
  declare SessionToken: string | null;

  // timestamps etc (if you later enable them)
  // public readonly createdAt!: Date;
  // public readonly updatedAt!: Date;

  // Associations (define in a static method)
  static associate(models: any) {
    // Example: if other models reference UserInfo, avoid auto-creating FK constraints/indexes:
    // models.SomeModel.belongsTo(UserInfo, {
    //   foreignKey: 'userId',
    //   constraints: false // prevents Sequelize from adding DB-level FK constraint (and related index)
    // });

    // If you need constraints, you can add them explicitly via migrations instead.
  }
}

UserInfo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    company: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    currposition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
      // NOTE: do NOT put `unique: true` here if you prefer to control index creation via model indexes or migrations.
    },
    salt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    SessionToken: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  },
  {
    sequelize: db as Sequelize,
    tableName: "userinfo",
    timestamps: false,
    // Only explicit indexes you want. Keep this list minimal.
    indexes: [
      // Keep email unique only if you actually need uniqueness in DB:
      {
        name: "uniq_user_email",
        unique: true,
        fields: ["email"]
      }
      // Add other composite indexes here if and only if your queries need them.
    ]
  }
);

export default UserInfo;
