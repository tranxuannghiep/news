const express = require("express");
const {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  getTodoById,
} = require("../controllers/todoControllers");
const router = express.Router();

router.get("/", getTodos);

router.get("/:id", getTodoById);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", updateTodo);

module.exports = router;
