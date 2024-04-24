// Constant Variables
const express = require('express');
const router = express.Router();

// Tasks Retrieval
const {getAllTask,getTask,createTask,editTask,deleteTask,} = require('../controllers/tasks');

// Route Retrieval
router.route('/').get(getAllTask).post(createTask);
router.route('/:id').get(getTask).patch(editTask).delete(deleteTask);

// Module Export
module.exports = router;