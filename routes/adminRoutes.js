const express = require('express');
const router = express.Router();
const { adminRegisterUser } = require('../controllers/authController');
const {
  addUser, getUsersByRole, deleteUser,
  addStudent, getAllStudents, deleteStudent, deleteBus
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// User routes
router.post('/register-user', protect, adminOnly, addUser);
router.get('/users/:role', protect, adminOnly, getUsersByRole);
router.delete('/user/:id', protect, adminOnly, deleteUser);

// Student routes
router.post('/student', protect, adminOnly, addStudent);
router.get('/students', protect, adminOnly, getAllStudents);
router.delete('/student/:id', protect, adminOnly, deleteStudent);


module.exports = router;
