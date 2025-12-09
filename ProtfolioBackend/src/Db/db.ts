import { Sequelize } from "sequelize";

const sequelize = new Sequelize("suraj", "root", "admin123", {
  host: "localhost",
  dialect: "mysql",
  logging: false, 
});

// const sequelize = new Sequelize("suraj", "root", "admin123", {
//   host: "host.docker.internal", // 👈 important change
//   port: 3306,                   // 👈 explicitly set port
//   dialect: "mysql",
//   logging: false,
// });

export default sequelize;
