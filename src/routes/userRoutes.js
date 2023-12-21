const express = require('express');
const multer = require('multer');

const {
  registerUser,
  loginUser,
  uploadProfileImage,
} = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Register a new user
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Protected route
router.get('/protected', verifyToken, (req, res) => {
  res.send({ message: 'This is a protected route.' });
});

// Uploading profile images route
router.post(
  '/profile-image',
  verifyToken,
  upload.single('image'),
  uploadProfileImage
);

module.exports = router;
