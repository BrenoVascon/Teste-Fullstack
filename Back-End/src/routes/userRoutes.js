const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController');
const authenticateJWT = require('../middleware/authenticateJWT');

// Rotas
router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateJWT, (req, res) => {
    res.json({ message: 'Profile accessed!', user: req.user });
});

module.exports = router;
