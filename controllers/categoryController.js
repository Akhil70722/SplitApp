// controllers/categoryController.js

const Category = require('../models/Category');

// @desc Add new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: "Category name is required" });
  }

  try {
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Category already exists" });
    }

    const category = await Category.create({ name: name.trim() });
    res.status(201).json({ success: true, data: category, message: "Category created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// @desc Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// @desc Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
