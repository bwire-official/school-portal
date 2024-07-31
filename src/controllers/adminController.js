const asyncHandler = require('express-async-handler');
const Course = require('../models/courseModel');
const Department = require('../models/departmentModel');
const User = require('../models/userModel');
const xlsx = require('xlsx');
const { google } = require('googleapis');
const { fetchAllReportData } = require('../utils/reportUtils'); // Updated import for utility function

// Add course
const addCourse = asyncHandler(async (req, res) => {
  const { name, description, department, teacher } = req.body;

  const course = new Course({
    name,
    description,
    department,
    teacher,
  });

  const createdCourse = await course.save();
  res.status(201).json(createdCourse);
});

// Update course
const updateCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, department, teacher } = req.body;

  const course = await Course.findById(id);

  if (course) {
    course.name = name || course.name;
    course.description = description || course.description;
    course.department = department || course.department;
    course.teacher = teacher || course.teacher;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Delete course
const deleteCourse = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const course = await Course.findById(id);

  if (course) {
    await course.remove();
    res.json({ message: 'Course removed' });
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

// Add department
const addDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const department = new Department({
    name,
    description,
  });

  const createdDepartment = await department.save();
  res.status(201).json(createdDepartment);
});

// Update department
const updateDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const department = await Department.findById(id);

  if (department) {
    department.name = name || department.name;
    department.description = description || department.description;

    const updatedDepartment = await department.save();
    res.json(updatedDepartment);
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
});

// Delete department
const deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const department = await Department.findById(id);

  if (department) {
    await department.remove();
    res.json({ message: 'Department removed' });
  } else {
    res.status(404).json({ message: 'Department not found' });
  }
});

// Add student
const addStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: 'student',
  });

  const createdUser = await user.save();
  res.status(201).json(createdUser);
});

// Update student
const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findById(id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Delete student
const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    await user.remove();
    res.json({ message: 'Student removed' });
  } else {
    res.status(404).json({ message: 'Student not found' });
  }
});

// Add teacher
const addTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    role: 'teacher',
  });

  const createdUser = await user.save();
  res.status(201).json(createdUser);
});

// Update teacher
const updateTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const user = await User.findById(id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Teacher not found' });
  }
});

// Delete teacher
const deleteTeacher = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (user) {
    await user.remove();
    res.json({ message: 'Teacher removed' });
  } else {
    res.status(404).json({ message: 'Teacher not found' });
  }
});

// Generate Excel Report
const generateExcelReport = asyncHandler(async (req, res) => {
  try {
    const data = await fetchAllReportData(); // Fetch data from the utility

    const worksheet = xlsx.utils.json_to_sheet(data.students); // Adjust to fit your data structure
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');

    // Add more sheets if necessary
    const coursesWorksheet = xlsx.utils.json_to_sheet(data.courses);
    xlsx.utils.book_append_sheet(workbook, coursesWorksheet, 'Courses');

    const departmentsWorksheet = xlsx.utils.json_to_sheet(data.departments);
    xlsx.utils.book_append_sheet(workbook, departmentsWorksheet, 'Departments');

    const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate report' });
  }
});

// Generate Google Sheets Report
const auth = new google.auth.GoogleAuth({
  keyFile: 'path-to-your-service-account-key-file.json', // Replace with your service account key file
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const generateGoogleSheetsReport = asyncHandler(async (req, res) => {
  try {
    const data = await fetchAllReportData(); // Fetch data from the utility
    const studentsValues = data.students.map(item => Object.values(item));
    const coursesValues = data.courses.map(item => Object.values(item));
    const departmentsValues = data.departments.map(item => Object.values(item));

    const authClient = await auth.getClient();
    const spreadsheetId = 'your-spreadsheet-id'; // Replace with your Google Sheets ID

    // Update Students sheet
    await google.sheets('v4').spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: 'Students!A1', // Adjust the range as needed
      valueInputOption: 'RAW',
      resource: { values: studentsValues }
    });

    // Update Courses sheet
    await google.sheets('v4').spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: 'Courses!A1', // Adjust the range as needed
      valueInputOption: 'RAW',
      resource: { values: coursesValues }
    });

    // Update Departments sheet
    await google.sheets('v4').spreadsheets.values.update({
      auth: authClient,
      spreadsheetId,
      range: 'Departments!A1', // Adjust the range as needed
      valueInputOption: 'RAW',
      resource: { values: departmentsValues }
    });

    res.send({ message: 'Report generated successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to generate report' });
  }
});

module.exports = {
  addCourse,
  updateCourse,
  deleteCourse,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  addStudent,
  updateStudent,
  deleteStudent,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  generateExcelReport,
  generateGoogleSheetsReport,
};
