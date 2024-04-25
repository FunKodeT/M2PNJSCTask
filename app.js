// Constant Variables
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
// Middleware
app.use(express.static('./public'))
app.use(express.json());

// Routes
app.use('/api/v1/tasks',tasks);

// Basic Server Start Setup
const PORT = process.env.PORT||3000;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on Port ${PORT}...`));
    }catch(error){
        console.log(error);
    };
};
start();