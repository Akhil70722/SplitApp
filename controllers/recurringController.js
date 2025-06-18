// controllers/recurringController.js

const RecurringExpense = require('../models/RecurringExpense');

// Add a new recurring expense
const addRecurringExpense = async (req, res) => {
  try {
    const { amount, description, paid_by, participants, recurrence } = req.body;

    if (!amount || !description || !paid_by || !participants || !recurrence) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const newRecurring = new RecurringExpense({
      amount,
      description,
      paid_by,
      participants,
      recurrence,
      next_due: calculateNextDueDate(recurrence)
    });

    const saved = await newRecurring.save();

    res.status(201).json({ success: true, data: saved, message: "Recurring expense added." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// Get all recurring expenses
const getAllRecurringExpenses = async (req, res) => {
  try {
    const recurring = await RecurringExpense.find();
    res.status(200).json({ success: true, data: recurring });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to retrieve data." });
  }
};

// Delete a recurring expense
const deleteRecurringExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RecurringExpense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Recurring expense not found." });
    }
    res.status(200).json({ success: true, message: "Recurring expense deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting expense." });
  }
};

// Helper function to calculate next due date
function calculateNextDueDate(recurrence) {
  const now = new Date();
  switch (recurrence) {
    case 'daily':
      return new Date(now.setDate(now.getDate() + 1));
    case 'weekly':
      return new Date(now.setDate(now.getDate() + 7));
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() + 1));
    default:
      return new Date();
  }
}

module.exports = {
  addRecurringExpense,
  getAllRecurringExpenses,
  deleteRecurringExpense
};
