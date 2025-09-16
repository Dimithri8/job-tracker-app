import express from "express";
import {
  createTodo,
  checkTodo,
  deleteTodo,
  getTodos,
} from "../controllers/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTodos);
router.post("/", protect, createTodo);
router.put("/:id", protect, checkTodo);
router.delete("/:id", protect, deleteTodo);

export default router;
