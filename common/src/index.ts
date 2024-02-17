import { z } from "zod";

export const userObject = z.object({
  username: z.string().min(3).max(15),
  password: z.string().min(4).max(12),
});

export const todoObject = z.object({
  title: z.string().min(1).max(12),
  description: z.string().min(0).max(50),
  is_done: z.boolean().optional(),
  userId: z.string().min(1).optional(),
});
