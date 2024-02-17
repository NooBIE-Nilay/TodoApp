import express from "express";
import mongoose from "mongoose";
const app = express();

import "dotenv/config";
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";
const DB_URL = process.env.DB_URl || "mongodb://localhost:27017/courses";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening at ${BACKEND_URL}${PORT}`);
});

mongoose.connect(DB_URL, { dbName: "todos" });
