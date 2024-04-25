// Constant Variables
const mongoose = require('mongoose');

// Mongoose Connect
const connectDB = (APIV1)=>{
    return mongoose.connect(APIV1,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
    });
};
module.exports = connectDB;