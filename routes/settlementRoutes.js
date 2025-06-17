const express = require('express');
const router = express.Router();
const { getBalances, getSettlements } = require('../controllers/settlementController');

router.get('/balances', getBalances);
router.get('/', getSettlements);

module.exports = router;