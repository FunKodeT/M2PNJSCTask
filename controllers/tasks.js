// Constant Variable Object
const Task = require('../models/Task');


/* Is it possible to create a variable that is equivalent to the error or success messages? I think it isn't calling it because res isn't established until the actual task itself, so I wonder how you would define it otherwise...see EX below:

const test = ({res.status(200).json({tasks})});

*/

// Task Command Variables
const getAllTask = async(req,res)=>{
    try{
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({msg:error});
    };
};

const getTask = async(req,res)=>{
    try{
        const {id:taskID}=req.params;
        const tasks = await Task.findOne({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
        };
        res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({msg:error});
    };
};

const createTask = async(req,res)=>{
    try{
        const tasks = await Task.create(req.body);
        res.status(200).json({tasks});
    }catch(error){
        res.status(500).json({msg:error});
    };
};

const deleteTask = async(req,res)=>{
    try{
        const {id:taskID}=req.params;
        const tasks = await Task.findOneAndDelete({_id:taskID});
        if(!task){
            return res.status(404).json({msg: `No task with ID: ${taskID}`});
        };
        res.status(200).json({tasks});
        // res.status(200).send();
        // res.status(200).json({task:null, status:'success'});
    }catch(error){
        res.status(500).json({msg:error});
    };
};


const updateTask = async(req,res)=>{
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
/* 
const editTask = (req,res)=>{
    res.send('edit one task');
};
 */
// Module Export
module.exports = {
    getAllTask,
    getTask,
    createTask,
    updateTask,
    // editTask,
    deleteTask,
};