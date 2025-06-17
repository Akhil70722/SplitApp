const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    const peopleSet = new Set();

    expenses.forEach(exp => {
      if (exp.payer) peopleSet.add(exp.payer);
      if (Array.isArray(exp.participants)) {
        exp.participants.forEach(p => peopleSet.add(p));
      }
    });

    res.json({ success: true, people: [...peopleSet] });
  } catch (err) {
    console.error('Error fetching people:', err.message);
    res.status(500).json({ success: false, message: "Server error while getting people" });
  }
});

module.exports = router;
