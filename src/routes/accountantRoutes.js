const express = require('express');
const router = express.Router();
const accountantController = require('../controllers/accountantController');
const { protect } = require('../middleware/authMiddleware');

router.route('/billing')
  .get(protect, accountantController.getBilling)
  .post(protect, accountantController.createBilling);

router.route('/billing/:id')
  .put(protect, accountantController.updateBilling)
  .delete(protect, accountantController.deleteBilling);

router.route('/expenses')
  .get(protect, accountantController.getExpenses)
  .post(protect, accountantController.createExpense);

router.route('/expenses/:id')
  .put(protect, accountantController.updateExpense)
  .delete(protect, accountantController.deleteExpense);

router.route('/financial-reports')
  .get(protect, accountantController.getFinancialReports);

router.route('/payroll')
  .get(protect, accountantController.getPayroll)
  .post(protect, accountantController.createPayroll);

router.route('/payroll/:id')
  .put(protect, accountantController.updatePayroll)
  .delete(protect, accountantController.deletePayroll);

module.exports = router;
