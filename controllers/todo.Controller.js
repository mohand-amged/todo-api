const mongoose = require('mongoose');
const todo = require('../models/todo.model');
const httpStatusText = require('../utils/httpStatusText');

// Get all todos

const getAllTodos = async (req, res) => {
    try {
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const skip = (page - 1) * limit
        const todos = await todo.find({}, {"__v" : false}).limit(limit).skip(skip);
        return res.status(200).json({  status: httpStatusText.SUCCESS, data: {todos} });
    } catch (error) {
        return res.status(500).json({ status : httpStatusText.ERROR, data : null, message: error.message, code : 500  });
    }
};

// Create a new todo

const createTodo = async (req, res) => {

    try {
        const { title } = req.body;
        const newTodo = await todo.create({ title, completed: false });
        return res.status(201).json(newTodo);
    } catch (error) {
        return res.status(400).json({ status : httpStatusText.ERROR, data : null, message: error.message, code : 400 });
    }
};

// Updated updateTodo function:
const updateTodo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({status: httpStatusText.FAIL , massage : `No todo with id: ${id}`});
      }
      const updatedDoc = await todo.findByIdAndUpdate(
        id,
        { title, completed },
        { new: true }
      );
      if (!updatedDoc) { // Check if document exists
        return res.status(404).json({ status : httpStatusText.FAIL , message: "Todo not found" });
      }
      res.json(updatedDoc);
    } catch (error) {
      return res.status(500).json({ status : httpStatusText.ERROR, data : null, message: error.message, code : 500 });
    }
  };
  
  // Updated deleteTodo function:
  const deleteTodo = async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send({status : httpStatusText.FAIL, massage : `No todo with id: ${id}`});
      }
      const deletedTodo = await todo.findByIdAndDelete(id);
      if (!deletedTodo) { // Check if document was found and deleted
        return res.status(404).json({ status : httpStatusText.ERROR , message: null });
      }
      res.json({status : httpStatusText.SUCCESS , data : null });
    } catch (error) {
      return res.status(500).json({ status : httpStatusText.ERROR, data : null, message: error.message, code : 500 });
    }
  };

module.exports = { getAllTodos, createTodo, updateTodo, deleteTodo };