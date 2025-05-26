const express = require('express');
const router = express.Router();
const { adminRegisterUser } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/register-user', protect, adminOnly, adminRegisterUser);

module.exports = router;
