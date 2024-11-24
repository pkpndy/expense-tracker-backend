const mongoose = require('mongoose');
const { CategoryArray } = require('../enums/categoryEnum');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { 
    type: String, 
    required: true, 
    enum: CategoryArray
  },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String }
});

module.exports = mongoose.model('Expense', expenseSchema);
