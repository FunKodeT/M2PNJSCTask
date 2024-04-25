// Constant Variables
const Task = require('../models/Task');
const asyncWrapper=require('../middleware/async');
const {createCustomError}=require('../errors/custom-error');

// Task Command Variables
const getAllTask = asyncWrapper(async(req,res)=>{
        const tasks = await Task.find({});
        res.status(200).json({tasks});
});

const getTask = asyncWrapper(async(req,res,next)=>{
        const {id:taskID}=req.params;
        const tasks = await Task.findOne({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with ID: ${taskID}`,404));
        };
        res.status(200).json({tasks});
});

const createTask = asyncWrapper(async(req,res)=>{
        const tasks = await Task.create(req.body);
        res.status(200).json({tasks});
});

const deleteTask = asyncWrapper(async(req,res)=>{
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return next(createCustomError(`No task with ID: ${taskID}`,404));
        };
        res.status(200).json({tasks});
});

const updateTask = asyncWrapper(async(req,res)=>{
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
        if(!task){
            return next(createCustomError(`No task with ID: ${taskID}`,404));
        };
        res.status(200).json({tasks});
});

// Module Export
module.exports = {
    getAllTask,
    getTask,
    createTask,
    deleteTask,
    updateTask
};