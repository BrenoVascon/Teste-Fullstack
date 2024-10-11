const express = require('express');
const { addTask, updateTask, deleteTask, getTasks } = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/tasks', authenticateToken, addTask);
router.put('/tasks/:id', authenticateToken, updateTask);
router.delete('/tasks/:id', authenticateToken, deleteTask);
router.get('/tasks', authenticateToken, getTasks);

module.exports = router;
