import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import db from "./Db/db";
import routes from "./MainRouter";

const app = express();

/**
 * ✅ CORS – handles OPTIONS (preflight) automatically
 * DO NOT use app.options("*") – it breaks Express in Node 20
 */
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/**
 * ✅ Body parsers
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * ✅ Other middlewares
 */
app.use(compression());
app.use(cookieParser());

/**
 * ✅ Debug logger (keep until everything works)
 */
app.use((req, _res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

/**
 * ✅ Routes
 */
app.use("/", routes);

const server = http.createServer(app);

/**
 * ✅ DB + Server startup
 */
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected successfully");

    await db.sync({ alter: true });
    console.log("📦 All models synced successfully");

    const PORT = Number(process.env.PORT) || 8080;

    server.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running at http://localhost:${PORT}/`);
    });
  } catch (err: any) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();
//  if you have env file : docker run -d -p 8080:8080 --env-file .env --name portfolio-backend portfoliobackend and for build docker build --no-cache -t portfoliobackend .