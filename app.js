// Constant Variables
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

// Middleware
app.use(express.json());

// Routes
app.get('/hello',(req,res)=>(
    res.send('Task Manager App')
));
app.use('/api/v1/tasks',tasks);

// Basic Server Start Setup
const PORT = process.env.PORT||3000;
app.listen(PORT, console.log(`Server is listening on Port ${PORT}...`));