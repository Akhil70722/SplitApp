const Expense = require('../models/Expense');
const calculateSettlements = require('../utils/settlementUtils');

const getBalances = async (req, res) => {
  const expenses = await Expense.find();
  const balances = {};

  expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;

    expense.participants.forEach((p) => {
      balances[p] = (balances[p] || 0) - share;
    });

    balances[expense.payer] = (balances[expense.payer] || 0) + expense.amount;
  });

  res.json(balances);
};

const getSettlements = async (req, res) => {
  const expenses = await Expense.find();
  const settlements = calculateSettlements(expenses);
  res.json({ settlements });
};

module.exports = { getBalances, getSettlements };
