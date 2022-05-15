const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [6, "Must be at least 6 characters"],
    maxlength: [30, "Must be less than 30 characters"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
