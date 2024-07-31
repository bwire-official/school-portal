const express = require('express');
const router = express.Router();
const {
    createCourse,
    assignGrades,
    viewCourses,
    markAttendance,
} = require('../controllers/teacherController');

router.post('/create-course', createCourse);
router.put('/assign-grades', assignGrades);
router.get('/view-courses', viewCourses);
router.put('/mark-attendance', markAttendance);

module.exports = router;
