// backend/routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add new expense
router.post('/', async (req, res) => {
  try {
    const { payer, amount, participants, description } = req.body;
    const expense = new Expense({ payer, amount, participants, description });
    await expense.save();
    res.status(201).json({ message: 'Expense added', data: expense });
  } catch (err) {
    res.status(500).json({ message: 'Error adding expense', error: err.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json({ data: expenses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expenses', error: err.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting expense', error: err.message });
  }
});

// 🔁 Update expense
router.put('/:id', async (req, res) => {
  try {
    const { payer, amount, participants, description } = req.body;
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      { payer, amount, participants, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense updated', data: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating expense', error: err.message });
  }
});

module.exports = router;
