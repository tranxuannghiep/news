const catchAsync = require("../middlewares/async");
const Todo = require("../models/todo");
const ApiError = require("../utils/ApiError");

exports.getTodos = catchAsync(async (req, res) => {
  const todos = await Todo.find();
  if (!todos.length) {
    throw new ApiError(400, "No Todos");
  }
  res.json({ success: true, data: todos });
});

exports.createTodo = catchAsync(async (req, res) => {
  const { title, description } = req.body;

  const todo = await Todo.create({
    title,
    description,
  });
  res.status(201).json(todo);
});

exports.deleteTodo = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ success: true });
});

exports.updateTodo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  await Todo.findByIdAndUpdate(id, { title, description });
  res.json({
    success: true,
  });
});

exports.getTodoById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new ApiError(404, "Not Found");
  }
  res.json({
    success: true,
    data: todo,
  });
});
