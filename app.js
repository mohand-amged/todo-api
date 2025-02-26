const express = require('express'); // Import express
const app = express(); // Create an express app
const port = 3000; // Set the port

const mongoose = require('mongoose');  // Import mongoose

// Connect to the database
const url = 'mongodb+srv://mohandamged70m:todo-api-v1@todo-api.kydx9.mongodb.net/?retryWrites=true&w=majority&appName=todo-api'
mongoose.connect(url)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Connection error:', err));

// Middleware
app.use(express.json());

// Routes
const todoRouter = require('./routes/todo.router');
app.use('/api', todoRouter); 

// Start the server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});