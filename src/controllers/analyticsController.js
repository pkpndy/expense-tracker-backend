const User = require('../models/User');
const Expense = require('../models/Expense');

// Set or update the user's monthly spending limit
const setMonthlyLimit = async (req, res) => {
  try {
    const { monthlyLimit } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(userId, { monthlyLimit }, { new: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'Monthly limit updated', monthlyLimit: updatedUser.monthlyLimit });
  } catch (error) {
    res.status(500).json({ message: 'Error setting monthly limit', error });
  }
};

// Get expense analytics for the authenticated user
const getAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Find the user's monthly limit
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const monthlyLimit = user.monthlyLimit;

    // Current month's date range
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

    // Fetch expenses for the current month
    const expenses = await Expense.find({
      userId: userId,
      date: { $gte: startOfMonth, $lte: endOfMonth }
    });

    // Calculate total expenses for the current month
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate percentage of monthly limit spent
    const percentageSpent = ((totalSpent / monthlyLimit) * 100).toFixed(2);

    // Aggregate expenses by category
    const expensesByCategory = await Expense.aggregate([
      { $match: { userId: user._id, date: { $gte: startOfMonth, $lte: endOfMonth } } },
      { $group: { _id: '$category', totalAmount: { $sum: '$amount' } } }
    ]);

    // Summarize expenses month-by-month (for trend analysis)
    const monthlyTrend = await Expense.aggregate([
      { $match: { userId: user._id } },
      {
        $group: {
          _id: { year: { $year: '$date' }, month: { $month: '$date' } },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      totalSpent,
      percentageSpent,
      expensesByCategory,
      monthlyTrend
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analytics', error });
  }
};

module.exports = { setMonthlyLimit, getAnalytics };
