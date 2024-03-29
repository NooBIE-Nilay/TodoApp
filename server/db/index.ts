import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  is_done: Boolean,
  userId: String,
});

export const User = mongoose.model("User", userSchema);
export const Todo = mongoose.model("Todo", todoSchema);
