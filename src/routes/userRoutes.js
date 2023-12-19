const express = require('express');

const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;
