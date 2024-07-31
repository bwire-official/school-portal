const Billing = require('../models/billingModel');
const Expense = require('../models/expenseModel');
const Payroll = require('../models/payrollModel');

// Get all billing records
exports.getBilling = async (req, res) => {
    try {
        const records = await Billing.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new billing record
exports.createBilling = async (req, res) => {
    const { studentId, amount, description } = req.body;

    try {
        const billing = new Billing({
            student: studentId,
            amount,
            description,
            createdAt: new Date()
        });

        await billing.save();
        res.status(201).json(billing);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a billing record
exports.updateBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!billing) {
            return res.status(404).json({ error: 'Billing record not found' });
        }
        res.status(200).json(billing);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a billing record
exports.deleteBilling = async (req, res) => {
    try {
        const billing = await Billing.findByIdAndDelete(req.params.id);
        if (!billing) {
            return res.status(404).json({ error: 'Billing record not found' });
        }
        res.status(200).json({ message: 'Billing record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new expense record
exports.createExpense = async (req, res) => {
    const { amount, description } = req.body;

    try {
        const expense = new Expense({
            amount,
            description,
            createdAt: new Date()
        });

        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update an expense record
exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) {
            return res.status(404).json({ error: 'Expense record not found' });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an expense record
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).json({ error: 'Expense record not found' });
        }
        res.status(200).json({ message: 'Expense record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all payroll records
exports.getPayroll = async (req, res) => {
    try {
        const records = await Payroll.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Create a new payroll record
exports.createPayroll = async (req, res) => {
    const { teacherId, amount, description } = req.body;

    try {
        const payroll = new Payroll({
            teacher: teacherId,
            amount,
            description,
            createdAt: new Date()
        });

        await payroll.save();
        res.status(201).json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a payroll record
exports.updatePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!payroll) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.status(200).json(payroll);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a payroll record
exports.deletePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findByIdAndDelete(req.params.id);
        if (!payroll) {
            return res.status(404).json({ error: 'Payroll record not found' });
        }
        res.status(200).json({ message: 'Payroll record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Placeholder for financial reports method
exports.getFinancialReports = async (req, res) => {
    try {
        // Placeholder logic for financial reports
        res.status(200).json({ message: 'Financial reports' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
