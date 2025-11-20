import dotenv from "dotenv";
dotenv.config(); 
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import db from "./Db/db";              
import routes from "./MainRouter"; 
  

const app = express();


app.use(cors({
  origin: "http://localhost:4200", // your Angular dev server
  credentials: true                // allow cookies / credentials
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// ✅ Use all routes from your MainRouter
app.use(routes);

const server = http.createServer(app);

// ✅ Async IIFE for DB + Server startup
(async () => {
  try {
    await db.authenticate();
    console.log("✅ Database connected successfully");

    // ⚙️ Automatically create or update tables
    // - `alter: true` safely updates schema without dropping data
    // - `force: true` drops & recreates tables (DANGEROUS, use only in dev)
    await db.sync({ alter: true });

    console.log("📦 All models synced successfully");

    server.listen(process.env.PORT, () => {
      console.log("🚀 Server running at http://localhost:8080/");
    });
  } catch (err: any) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
})();
