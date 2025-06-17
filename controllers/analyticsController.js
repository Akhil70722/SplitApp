const Expense = require('../models/Expense');
exports.monthlyBreakdown = async (req, res) => {
  const expenses = await Expense.find();
  const summary = {};
  expenses.forEach(e => {
    const month = e.date.toISOString().slice(0, 7);
    summary[month] = (summary[month] || 0) + e.amount;
  });
  res.json(summary);
};