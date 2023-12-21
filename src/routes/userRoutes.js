const express = require('express');

const { registerUser, loginUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route
router.get('/protected', verifyToken, (req, res) => {
  res.send({ message: 'This is a protected route.' });
});

module.exports = router;
