exports.validateExpense = (expense) => {
  if (!expense.description || !expense.amount || !expense.paidBy || !expense.participants.length) {
    throw new Error('Invalid expense');
  }
};