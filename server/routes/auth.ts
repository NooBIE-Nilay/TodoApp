import jwt from "jsonwebtoken";
import { Router, Request, Response } from "express";
import { User } from "../db";
import { authenticateJwt, validateUser } from "../middleware";
import "dotenv/config";
const router = Router();

let JWT_SECRET = process.env.JWT_SECRET || "SECRET";
//Signup Route
router.post("/signup", validateUser, async (req: Request, res: Response) => {
  const { username, password } = res.locals.user;
  // Check if user is already present
  const user = await User.findOne({ username: username });
  if (user) return res.status(403).json({ msg: "Username already exists" });
  // Create new User
  const newUser = new User({ username, password });
  try {
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ msg: "User Created Successfully", token });
  } catch (err) {
    return res.status(400).json({ msg: "Error While Creating User", err });
  }
});

// Login Route
router.post("/login", validateUser, async (req: Request, res: Response) => {
  const { username, password } = res.locals.user;
  // Search for user in DataBase
  const user = await User.findOne({ username: username, password: password });
  if (!user) return res.status(401).json({ msg: "Invalid Credentials" });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ msg: "Logged in Successdfully", token });
});

router.get("/me", authenticateJwt, async (req: Request, res: Response) => {
  const userId = res.locals.id;
  const user = await User.findOne({ _id: userId });
  if (user) return res.json({ username: user.username });
  return res.status(403).json({ msg: "User Token/ID Invalid" });
});

export default router;
