import { Model, DataTypes } from "sequelize";
import db from "../Db/db";

class WorkExp extends Model {
    declare id: number;
    //   declare name: string;
    //   declare password: string;
    //   declare contact: string;
    declare duration1: string;
    declare duration2: string;
    declare duration3: string;
    declare duration4: string;
    declare email: string;
    declare cabout1: string;
    declare currcompany1: string;
    declare cabout2: string;
    declare currcompany2: string;
    declare cabout3: string;
    declare currcompany3: string;
    declare cabout4: string;
    declare currcompany4: string;

    //      declare currposition:string;
    declare role1: string;
    declare role2: string;
    declare role3: string;
    declare rol4: string;

    //   declare salt:string;
    //   declare SessionToken:string;

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
            allowNull: false,
            unique: true
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
            type: DataTypes.STRING,
            allowNull: true
        },
        currcompany2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currcompany3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        currcompany4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration1: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        duration4: {
            type: DataTypes.STRING,
            allowNull: true
        },




    },
    {
        sequelize: db,
        tableName: "workexp",
        timestamps: false
    }
);

export default WorkExp;
