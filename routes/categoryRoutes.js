// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  deleteCategory,
} = require('../controllers/categoryController');

// Add a new expense category
router.post('/', addCategory);

// Get all categories
router.get('/', getAllCategories);

// Delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
