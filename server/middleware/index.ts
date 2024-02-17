import { Request, Response, NextFunction } from "express";
import { userObject, todoObject } from "../../common/src";
import jwt from "jsonwebtoken";

import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";
// Authenticate User
export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization || "";
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer")
    return res.status(403).json({ msg: "Invalid Authorization Token" });
  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err || !payload || typeof payload == "string")
      return res.status(403).json({ msg: "Invalid Authorization Token" });
    res.locals.id = payload.id;
    next();
  });
};

// Validate User using Zod
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let parsedUser = userObject.safeParse(req.body);
  if (!parsedUser.success) {
    // console.log(parsedUser.error);
    return res.status(403).json({ msg: parsedUser.error });
  }
  // const { username, password } = parsedUser.data;
  res.locals.user = parsedUser.data;
  next();
};

// Validate Todo using Zod
export const validateTodo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let parsedUser = todoObject.safeParse(req.body);
  if (!parsedUser.success) {
    // console.log(parsedUser.error);
    return res.status(403).json({ msg: parsedUser.error });
  }
  res.locals.todo = parsedUser.data;
  next();
};
