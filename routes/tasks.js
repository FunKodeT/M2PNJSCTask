// Constant Variables
const express = require('express');
const router = express.Router();

// Tasks Retrieval
const {getAllTask,getTask,createTask,updateTask,deleteTask,} = require('../controllers/tasks');
/* 
editTask
 */

// Route Retrieval
router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask);
/* 
editTask
 */

// Module Export
module.exports = router;