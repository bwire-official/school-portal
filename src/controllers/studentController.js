const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Assignment = require('../models/assignmentModel');
const Grade = require('../models/gradeModel');
const Attendance = require('../models/attendanceModel');

// Register a course
const registerCourse = asyncHandler(async (req, res) => {
    const { courseId } = req.body;
    const studentId = req.user._id; // Assuming user is authenticated and ID is available

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: 'Course registered successfully' });
});

// View assignments
const viewAssignments = asyncHandler(async (req, res) => {
    const studentId = req.user._id; // Assuming user is authenticated and ID is available

    const assignments = await Assignment.find({ student: studentId });
    res.status(200).json(assignments);
});

// View grades
const viewGrades = asyncHandler(async (req, res) => {
    const studentId = req.user._id; // Assuming user is authenticated and ID is available

    const grades = await Grade.find({ student: studentId });
    res.status(200).json(grades);
});

// View attendance record
const attendanceRecord = asyncHandler(async (req, res) => {
    const studentId = req.user._id; // Assuming user is authenticated and ID is available

    const attendance = await Attendance.find({ student: studentId });
    res.status(200).json(attendance);
});

module.exports = {
    registerCourse,
    viewAssignments,
    viewGrades,
    attendanceRecord,
};
