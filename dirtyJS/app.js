// Constant Variables
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// Require .env For Server Start
require('dotenv').config();

// Middleware
app.use(express.static('./public'))
app.use(express.json());

// Routes
app.use('/api/v1/tasks',tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

// Basic Server Start Setup
/* 
const port = 3000;
const port = process.env.PORT||3000;
const PORT = 3000;
*/
const PORT=process.env.PORT||3000;
const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, console.log(`Server is listening on Port ${PORT}...`));
    }catch(error){
        console.log(error);
    };
};
start();