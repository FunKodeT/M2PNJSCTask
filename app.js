// PACKAGE IMPORTS
require('dotenv').config();
require('express-async-errors');

// ASYNC ERRORS

// SERVER APPLICATION
const express =require('express');
const app =express();
const connectDB=require('./db/connect');
const productsRouter=require('./routes/products');

// MIDDLEWARE
const notFoundMid =require('./middleware/not-found');
const fetchErrorMid =require('./middleware/error-handler');
app.use(express.json());

// ROUTES
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
app.use('/api/v1/products',productsRouter);

// PRODUCTS ROUTE

// SERVER START SETTINGS
app.use(notFoundMid);
app.use(fetchErrorMid);
const port = process.env.PORT||3000;
const start = async()=>{
    try{
        // MONGODB VARIABLE CONNECTION
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`Server is listening on ${port}...`));
    }catch(error){
        console.log(error);
    };
};

// SERVER START
start();