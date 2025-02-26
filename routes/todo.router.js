const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.Controller');

router.get('/todos', todoController.getAllTodos); // Get all todos
router.post('/todos', todoController.createTodo); // Create a new todo
router.put('/todos/:id', todoController.updateTodo); // Update a todo
router.delete('/todos/:id', todoController.deleteTodo); // Delete a todo

module.exports = router;