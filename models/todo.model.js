const mongoose = require('mongoose'); // Import mongoose
const Schema = mongoose.Schema; // Define the schema

// Create a new schema for our todo data
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema);