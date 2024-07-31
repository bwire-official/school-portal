const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Grade = require('../models/gradeModel');
const Attendance = require('../models/attendanceModel');

// Create a course
const createCourse = asyncHandler(async (req, res) => {
    const { name, description, department } = req.body;
    const teacherId = req.user._id; // Assuming user is authenticated and ID is available

    const course = new Course({
        name,
        description,
        department,
        teacher: teacherId,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully' });
});

// Assign grades to students
const assignGrades = asyncHandler(async (req, res) => {
    const { studentId, courseId, grade } = req.body;

    const newGrade = new Grade({
        student: studentId,
        course: courseId,
        grade,
    });

    await newGrade.save();
    res.status(200).json({ message: 'Grades assigned successfully' });
});

// View courses
const viewCourses = asyncHandler(async (req, res) => {
    const teacherId = req.user._id; // Assuming user is authenticated and ID is available

    const courses = await Course.find({ teacher: teacherId });
    res.status(200).json(courses);
});

// Mark attendance
const markAttendance = asyncHandler(async (req, res) => {
    const { studentId, courseId, date, status } = req.body;

    const attendance = new Attendance({
        student: studentId,
        course: courseId,
        date,
        status,
    });

    await attendance.save();
    res.status(200).json({ message: 'Attendance marked successfully' });
});

module.exports = {
    createCourse,
    assignGrades,
    viewCourses,
    markAttendance,
};
