const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  toggleStatus,
  deleteTask,
} = require('../controllers/taskController');

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

router.route('/:id/status')
  .patch(toggleStatus);

module.exports = router;
