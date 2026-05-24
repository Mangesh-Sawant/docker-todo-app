const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store our to-dos (just for learning purposes)
let todos = [
    { id: 1, task: "Learn Docker", completed: false },
    { id: 2, task: "Build Node Backend", completed: true }
];

// Route: Get all todos
app.get('/api/todos', (req, res) => {
    res.json(todos);
});

// Route: Add a new todo
app.post('/api/todos', (req, res) => {
    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Route: Health check to verify API is running
app.get('/', (req, res) => {
    res.send('To-Do API is up and running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
