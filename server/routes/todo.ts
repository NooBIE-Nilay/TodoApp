import { Router, Request, Response } from "express";
import { authenticateJwt, validateTodo } from "../middleware";
import { Todo } from "../db";

const router = Router();

// POST ~> todo/todos
router.post(
  "/todos",
  authenticateJwt,
  validateTodo,
  async (req: Request, res: Response) => {
    const { title, description } = res.locals.todo;
    const done = false;
    const userId = res.locals.id;
    const newTodo = new Todo({ title, description, done, userId });
    try {
      await newTodo.save();
      res.status(201).json({ msg: "Todo Created Successfully", newTodo });
    } catch (err) {
      return res.status(400).json({ msg: "Error While Creating Todo", err });
    }
  }
);

// GET ~> todos/todos
router.get("/todos", authenticateJwt, async (req: Request, res: Response) => {
  const userId = res.locals.id;
  try {
    const todos = await Todo.find({ userId });
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ msg: "Failed to fetch Todos", err });
  }
});

//PATCH ~> todos/todos/:todoId/done
router.patch(
  "/todos/:todoId/done",
  authenticateJwt,
  async (req: Request, res: Response) => {
    const { todoId } = req.params;
    const userId = res.locals.id;
    Todo.findOneAndUpdate(
      { _id: todoId, userId },
      { is_done: true },
      { new: true }
    )
      .then((updatedTodo) => {
        if (!updatedTodo) {
          return res.status(404).json({ msg: "Todo Not Found" });
        }
        return res.json(updatedTodo);
      })
      .catch((err) => {
        return res.status(500).json({ msg: "Failed To Update Todo", err });
      });
  }
);

export default router;
