// models/RecurringExpense.js

const mongoose = require('mongoose');

const RecurringExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: [0, "Amount must be positive"]
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  paid_by: {
    type: String,
    required: true,
    trim: true
  },
  participants: {
    type: [String],
    required: true,
    validate: [arr => arr.length > 0, "At least one participant is required"]
  },
  recurrence: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly']
  },
  next_due: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('RecurringExpense', RecurringExpenseSchema);
