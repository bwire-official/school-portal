const User = require('../models/userModel');
const Course = require('../models/courseModel');
const Department = require('../models/departmentModel');

// Function to fetch student data
const fetchStudentData = async () => {
  try {
    const students = await User.find({ role: 'student' }).lean();
    return students;
  } catch (error) {
    throw new Error('Failed to fetch student data from database');
  }
};

// Function to fetch course data
const fetchCourseData = async () => {
  try {
    const courses = await Course.find().lean();
    return courses;
  } catch (error) {
    throw new Error('Failed to fetch course data from database');
  }
};

// Function to fetch department data
const fetchDepartmentData = async () => {
  try {
    const departments = await Department.find().lean();
    return departments;
  } catch (error) {
    throw new Error('Failed to fetch department data from database');
  }
};

// Function to fetch all report data
const fetchAllReportData = async () => {
  try {
    const students = await fetchStudentData();
    const courses = await fetchCourseData();
    const departments = await fetchDepartmentData();

    const reportData = {
      students,
      courses,
      departments
    };

    return reportData;
  } catch (error) {
    throw new Error('Failed to fetch all report data');
  }
};

module.exports = { fetchStudentData, fetchCourseData, fetchDepartmentData, fetchAllReportData };
