const express = require('express');
const { monthlyBreakdown } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/monthly', async (req, res, next) => {
  try {
    await monthlyBreakdown(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;