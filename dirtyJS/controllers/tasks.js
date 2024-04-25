// Constant Variables
const Task = require('../models/Task');
const asyncWrapper=require('../middleware/async');
const {createCustomError}=require('../errors/custom-error');

// Task Command Variables
const getAllTask = asyncWrapper(async(req,res)=>{
    /* 
    try{
    */
        const tasks = await Task.find({});
        res.status(200).json({tasks});
        /* 
        res.status(200).json({tasks,amount:tasks.length});
        res.status(200).json({success:true,data:{tasks,nbHits:tasks.length}});
        res.status(200).json({status:"success",data:{tasks,nbHits:tasks.length}});
         */
    /* 
    }catch(error){
        res.status(500).json({msg:error});
    };
     */
});

const getTask = asyncWrapper(async(req,res,next)=>{
    /* 
    try{
     */
        const {id:taskID}=req.params;
        const tasks = await Task.findOne({_id:taskID});
        if(!task){
            /* 
            const error=new Error('Not Found');
            error.status=404;
            return next(error);
             */
            return next(createCustomError(`No task with ID: ${taskID}`,404));
            /*
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
             */
        };
        res.status(200).json({tasks});
    /* 
    }catch(error){
        res.status(500).json({msg:error});
    };
     */
});

const createTask = asyncWrapper(async(req,res)=>{
    /* 
    try{
     */
        const tasks = await Task.create(req.body);
        res.status(200).json({tasks});
    /* 
    }catch(error){
        res.status(500).json({msg:error});
    };
     */
});

const deleteTask = asyncWrapper(async(req,res)=>{
    /* 
    try{
     */
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            /* 
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
             */
            return next(createCustomError(`No task with ID: ${taskID}`,404));
        };
        res.status(200).json({tasks});
        /* 
        res.status(200).send();
        res.status(200).json({task:null, status:'success'});
         */
    /* 
    }catch(error){
        res.status(500).json({msg:error});
    };
     */
});

const updateTask = asyncWrapper(async(req,res)=>{
    /* 
    try{
     */
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
        if(!task){
            /* 
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
             */
            return next(createCustomError(`No task with ID: ${taskID}`,404));
        };
        res.status(200).json({tasks});
    /* 
    }catch(error){
        res.status(500).json({msg:error});
    };
     */
});
/* 
const editTask = async(req,res)=>{
    try{
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true});
        if(!task){
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
        };
        res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({msg:error});
    };
};
*/

// Module Export
module.exports = {
    getAllTask,
    getTask,
    createTask,
    deleteTask,
    updateTask,
    /* 
    editTask,
     */
};