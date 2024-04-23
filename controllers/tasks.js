// Constant Variable Object
const getAllTask = (req,res)=>{
    res.send('get all tasks');
};
const getTask = (req,res)=>{
    res.send('get one task');
};
const createTask = (req,res)=>{
    res.send('create one task');
};
const editTask = (req,res)=>{
    res.send('edit one task');
};
const deleteTask = (req,res)=>{
    res.send('delete one task');
};

// Module Export
module.exports = {
    getAllTask,
    getTask,
    createTask,
    editTask,
    deleteTask,
};