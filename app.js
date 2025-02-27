const express = require('express'); // Import express
require('dotenv').config(); // Import dotenv
const app = express(); // Create an express app
const cors = require('cors'); // Import cors
const httpStatusText = require('./utils/httpStatusText'); // Import httpStatusText

app.use(cors()); // Use cors

const mongoose = require('mongoose');  // Import mongoose

// Connect to the database
const url = process.env.MONGO_URL;
mongoose.connect(url)
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Connection error:', err));

// Middleware
app.use(express.json());

// Routes
const todoRouter = require('./routes/todo.router');
app.use('/api', todoRouter); 

// 404 Error handling
app.all('*', (req, res, next) => {
  res.status(404).json({ status: httpStatusText.FAIL, message: 'Route not found' });
});

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:${process.env.PORT}`);
});