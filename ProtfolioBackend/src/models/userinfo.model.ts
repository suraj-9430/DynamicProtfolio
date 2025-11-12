import { Model, DataTypes } from "sequelize";
import db from "../Db/db";

class UserInfo extends Model {
  declare id: number;
  declare name: string;
  declare password: string;
  declare contact: string;
  declare address: string;
  declare email:string;
   declare about:string;
    declare company:string;
     declare currposition:string;
     declare role:string;
  declare salt:string;
  declare SessionToken:string;

}

UserInfo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
   
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true
    },
     company: {
      type: DataTypes.STRING,
      allowNull: true
    },
     currposition: {
      type: DataTypes.STRING,
      allowNull: true
    },
     role: {
      type: DataTypes.STRING,
      allowNull: true
    },
     email: {                    
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    salt:{
      type:DataTypes.STRING,
      allowNull:true
    },
     SessionToken:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  {
    sequelize: db,
    tableName: "userinfo",
    timestamps: false
  }
);

export default UserInfo;
