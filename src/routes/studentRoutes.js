const express = require('express');
const router = express.Router();
const {
    registerCourse,
    viewAssignments,
    viewGrades,
    attendanceRecord,
} = require('../controllers/studentController');

router.post('/register-course', registerCourse);
router.get('/view-assignments', viewAssignments);
router.get('/view-grades', viewGrades);
router.get('/attendance-record', attendanceRecord);

module.exports = router;
