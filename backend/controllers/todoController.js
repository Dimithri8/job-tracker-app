import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const todo = await Todo.create({ user: req.user.id, text });
    res.status(201).json({ message: "Todo created successfully", todo: todo });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to create todo",
      error: error.message,
    });
  }
};

export const checkTodo = async (req, res) => {
  try {
    const { isChecked } = req.body;
    const checkedTodo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      { isChecked },
      { new: true }
    );

    if (!checkedTodo)
      return res.status(404).json({ message: "Cannot find job to updated" });
    res.status(200).json({ message: "Todo checked", checkedTodo: checkedTodo });
  } catch (error) {
    res.status(500).json({ message: "Server error, unable to updated todo" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedTodo)
      return res.status(404).json({ message: "Unable to find todo to delete" });
    res
      .status(200)
      .json({ message: "Todo deleted successfully", deletedTodo: deletedTodo });
  } catch (error) {
    res.status(500).json({
      message: "Server error, unable to delete todo",
      error: error.message,
    });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.send({ todos: todos });
  } catch (error) {
    res.status(500).json({ message: "Server error, unable to get all todos" });
  }
};
