const Expense = require('../models/Expense');

// @desc Add a new expense
// @route POST /api/expenses
exports.addExpense = async (req, res) => {
  try {
    const { payer, amount, participants, description } = req.body;

    // Backend validation
    if (!payer || typeof payer !== 'string' || payer.trim() === '') {
      return res.status(400).json({ success: false, message: 'Payer is required and must be a non-empty string' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be a positive number' });
    }

    if (!Array.isArray(participants) || participants.length === 0 || participants.some(p => typeof p !== 'string')) {
      return res.status(400).json({ success: false, message: 'Participants must be a non-empty array of strings' });
    }

    const expense = new Expense({
      payer: payer.trim(),
      amount,
      participants: participants.map(p => p.trim()),
      description: description?.trim() || '',
      date: new Date(),
    });

    const saved = await expense.save();

    res.status(201).json({
      success: true,
      data: saved,
      message: 'Expense added successfully',
    });
  } catch (err) {
    console.error('❌ Error adding expense:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while adding expense',
      error: err.message,
    });
  }
};

// @desc Get all expenses
// @route GET /api/expenses
exports.getExpenses = async (req, res) => {
  try {
    const all = await Expense.find().sort({ createdAt: -1 });
    res.json({ success: true, data: all });
  } catch (err) {
    console.error('❌ Error fetching expenses:', err);
    res.status(500).json({ success: false, message: 'Server error while fetching expenses' });
  }
};

// @desc Update an expense
// @route PUT /api/expenses/:id
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Log the incoming update body for debugging
    console.log("➡️ Incoming PUT Body:", req.body);

    const { payer, amount, participants, description } = req.body;

    // Validate input
    if (!payer || typeof payer !== 'string' || payer.trim() === '') {
      return res.status(400).json({ success: false, message: 'Payer is required and must be a non-empty string' });
    }

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount must be a positive number' });
    }

    if (!Array.isArray(participants) || participants.length === 0 || participants.some(p => typeof p !== 'string')) {
      return res.status(400).json({ success: false, message: 'Participants must be a non-empty array of strings' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      {
        payer: payer.trim(),
        amount,
        participants: participants.map(p => p.trim()),
        description: description?.trim() || '',
      },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ success: false, message: 'Expense not found' });
    }

    console.log("✅ Expense updated:", updatedExpense);
    res.status(200).json({
      success: true,
      message: 'Expense updated successfully',
      data: updatedExpense,
    });

  } catch (err) {
    console.error("❌ Exception while updating expense:", err);
    res.status(500).json({
      success: false,
      message: 'Server error while updating expense',
      error: err.message,
    });
  }
};

// @desc Delete an expense
// @route DELETE /api/expenses/:id
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      success: true,
      data: deletedExpense,
      message: 'Expense deleted successfully',
    });
  } catch (err) {
    console.error('❌ Error deleting expense:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting expense',
    });
  }
};
