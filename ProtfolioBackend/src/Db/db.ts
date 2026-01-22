import { Sequelize } from "sequelize";

// Database configuration with environment variable support
const DB_NAME = process.env.DB_NAME || "suraj";
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "admin123";
const DB_HOST = process.env.DB_HOST || "localhost"; // Use "host.docker.internal" for Docker
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_LOGGING = process.env.DB_LOGGING === "true" || false;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: DB_LOGGING,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
