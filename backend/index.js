const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

const PORT = process.env.PORT || 3000;

// Check if the cloud gives us a URL. If not, fallback to our local Docker database.
const DB_URL = process.env.MONGO_URI || 'mongodb://database:27017/todoapp';

mongoose.connect(DB_URL)
    .then(() => console.log(`✅ Connected to MongoDB at: ${DB_URL}`))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// 2. Define our Data Structure (Schema)
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean
});


const Todo = mongoose.model('Todo', todoSchema);

// 3. Get all Todos from the Database
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find(); // Fetches from DB
    res.json(todos);
});

// 4. Save a new Todo to the Database
app.post('/api/todos', async (req, res) => {
    const newTodo = new Todo({
        task: req.body.task,
        completed: false
    });
    await newTodo.save(); // Saves to DB
    res.status(201).json(newTodo);
});

app.delete('/api/todos/:id', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted Successfully" })
    } catch {
        res.status(500).json({ message: "Failed to delete" })
    }
})

app.get('/', (req, res) => {
    res.send('To-Do API is up and running!');
});

app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
