const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// Define routes for admin
router.route('/courses').post(protect, adminController.addCourse);
router.route('/courses/:id').put(protect, adminController.updateCourse).delete(protect, adminController.deleteCourse);

router.route('/departments').post(protect, adminController.addDepartment);
router.route('/departments/:id').put(protect, adminController.updateDepartment).delete(protect, adminController.deleteDepartment);

router.route('/students').post(protect, adminController.addStudent).put(protect, adminController.updateStudent).delete(protect, adminController.deleteStudent);

router.route('/teachers').post(protect, adminController.addTeacher).put(protect, adminController.updateTeacher).delete(protect, adminController.deleteTeacher);

router.route('/reports/excel').get(protect, adminController.generateExcelReport);
router.route('/reports/google-sheets').get(protect, adminController.generateGoogleSheetsReport);

module.exports = router;
