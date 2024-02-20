import express from "express";
import mongoose from "mongoose";
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost";
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/test";
import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todo";
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/todo", todoRoutes);

async function connectDB() {
  let str = ".";
  const connecting = setInterval(() => {
    console.log(`Connecting to DB${str}`);
    str = str + ".";
  }, 500);
  const couldntConnect = setTimeout(() => {
    clearInterval(connecting);
    throw new Error("Couldn't Connect To DB");
  }, 5 * 1000);
  await mongoose.connect(DB_URL, { dbName: "todo-app" });
  console.log("Connected to monogDB");
  clearInterval(connecting);
  clearTimeout(couldntConnect);
  app.listen(PORT, () => {
    console.log(`App listening at ${BACKEND_URL}:${PORT}`);
  });
}
connectDB().catch((err) => {
  console.log(err);
});
