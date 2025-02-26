const mongoose = require('mongoose');
const todo = require('../models/todo.model');

// Get all todos

const getAllTodos = async (req, res) => {
    try {
        const todos = await todo.find();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Create a new todo

const createTodo = async (req, res) => {

    try {
        const { title } = req.body;
        const newTodo = await todo.insertOne({ title, completed: false });
        return res.status(201).json(newTodo);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// Updated updateTodo function:
const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No todo with id: ${id}`);
      }
      const updatedDoc = await todo.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true }
      );
      if (!updatedDoc) { // Check if document exists
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(updatedDoc);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Updated deleteTodo function:
  const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No todo with id: ${id}`);
      }
      const deletedTodo = await todo.findByIdAndDelete(id);
      if (!deletedTodo) { // Check if document was found and deleted
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json({ message: "Todo deleted successfully." });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };