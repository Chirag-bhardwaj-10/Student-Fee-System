const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllStudents, getStudentProfile, updateProfile } = require('../controllers/studentController');

router.get('/', protect, getAllStudents);
router.get('/profile', protect, getStudentProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;