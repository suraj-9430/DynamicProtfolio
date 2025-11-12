import { Sequelize } from "sequelize";

const sequelize = new Sequelize("suraj", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

export default sequelize;
