function calculateSettlements(expenses) {
  const balances = {};
  expenses.forEach((expense) => {
    const share = expense.amount / expense.participants.length;
    expense.participants.forEach((p) => {
      balances[p] = (balances[p] || 0) - share;
    });
    balances[expense.payer] = (balances[expense.payer] || 0) + expense.amount;
  });

  const creditors = [];
  const debtors = [];

  for (const person in balances) {
    const bal = parseFloat(balances[person].toFixed(2));
    if (bal > 0) creditors.push({ name: person, amount: bal });
    else if (bal < 0) debtors.push({ name: person, amount: -bal });
  }

  const settlements = [];

  while (creditors.length && debtors.length) {
    const creditor = creditors[0];
    const debtor = debtors[0];

    const amount = Math.min(creditor.amount, debtor.amount);
    settlements.push({ from: debtor.name, to: creditor.name, amount: parseFloat(amount.toFixed(2)) });

    creditor.amount -= amount;
    debtor.amount -= amount;

    if (creditor.amount === 0) creditors.shift();
    if (debtor.amount === 0) debtors.shift();
  }

  return settlements;
}

module.exports = calculateSettlements;
