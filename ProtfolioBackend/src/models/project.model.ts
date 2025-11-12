
import { Model, DataTypes } from "sequelize";
import db from "../Db/db";

class Project extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare title: string;
    declare year: string;
    declare sitelink: string;
    declare descriptions: object;
}

Project.init(
    {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING, // optional: if linked to a user
            allowNull: true,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        year: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        sitelink: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        descriptions: {
            type: DataTypes.JSON,
            allowNull: false,
        },

    },
    {
        sequelize: db,
        tableName: "project",
        timestamps: false
    }
);

export default Project;


