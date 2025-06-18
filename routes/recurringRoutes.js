// routes/recurringRoutes.js

const express = require('express');
const router = express.Router();
const {
  addRecurringExpense,
  getAllRecurringExpenses,
  deleteRecurringExpense,
} = require('../controllers/recurringController');

// @route   POST /api/recurring
// @desc    Add new recurring expense
router.post('/', addRecurringExpense);

// @route   GET /api/recurring
// @desc    Get all recurring expenses
router.get('/', getAllRecurringExpenses);

// @route   DELETE /api/recurring/:id
// @desc    Delete a recurring expense
router.delete('/:id', deleteRecurringExpense);

module.exports = router;
