const express = require('express');
const { calculateBalances } = require('../controllers/balanceController');

const router = express.Router();

// @route   GET /api/balances
// @desc    Get current balance of each person
router.get('/', calculateBalances);

module.exports = router;
