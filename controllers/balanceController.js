const Expense = require('../models/Expense');

// Calculate balances for each user
const calculateBalances = async (req, res) => {
  try {
    const expenses = await Expense.find();

    const balances = {};

    for (const exp of expenses) {
      const splitAmount = exp.amount / exp.participants.length;

      // Each participant owes splitAmount
      for (const person of exp.participants) {
        if (!balances[person]) balances[person] = 0;
        balances[person] -= splitAmount;
      }

      // The payer is credited the full amount
      if (!balances[exp.payer]) balances[exp.payer] = 0;
      balances[exp.payer] += exp.amount;
    }

    res.json({ success: true, data: balances });
  } catch (err) {
    console.error('Error calculating balances:', err.message);
    res.status(500).json({ success: false, message: 'Failed to calculate balances' });
  }
};

module.exports = { calculateBalances };
