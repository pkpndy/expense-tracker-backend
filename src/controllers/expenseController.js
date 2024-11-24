const Expense = require("../models/Expense");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
  try {
    const { amount, category, name: description } = req.body;
    const userId = req.user.userId;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyExpenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const totalMonthlyExpenses = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    const user = await User.findById(userId);
    const monthlyLimit = user.monthlyLimit;

    if (totalMonthlyExpenses + amount > monthlyLimit) {
      return res.status(400).json({ message: "Monthly limit exceeded" });
    }

    const expense = new Expense({
      userId,
      amount,
      category,
      description,
    });
    await expense.save();

    return res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    console.error("Error adding expense:", error);
    return res.status(500).json({ message: "Error adding expense", error });
  }
};


// Get all expenses with optional filters
exports.getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate, minAmount, maxAmount } = req.query; // Retrieve filters from query parameters
    const query = { userId: req.user.userId };

    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    const expenses = await Expense.find(query).sort({ date: -1 }); // Sort by date in descending order
    return res.json(expenses);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving expenses", error });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;
    const userId = req.user.userId;

    // Retrieve the original expense to get its current amount
    const originalExpense = await Expense.findById(id);
    if (!originalExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Retrieve existing expenses for the current month
    const startOfMonth = new Date(date || originalExpense.date);
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const monthlyExpenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lt: endOfMonth },
      _id: { $ne: id }, // Exclude the expense being updated
    });

    const totalMonthlyExpenses = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);

    // Retrieve the user's monthly limit
    const user = await User.findById(userId); // Assuming you have a User model
    const monthlyLimit = user.monthlyLimit;

    if (totalMonthlyExpenses + amount > monthlyLimit) {
      return res.status(400).json({ message: "Monthly limit exceeded" });
    }

    // Update the expense
    const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });

    return res.json({ message: "Expense updated successfully", updatedExpense });
  } catch (error) {
    return res.status(500).json({ message: "Error updating expense", error });
  }
};


// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    return res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting expense", error });
  }
};

// Analytics (by category and monthly)
exports.getAnalytics = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [categorySummary, monthlySummary] = await Promise.all([
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: "$category", totalAmount: { $sum: "$amount" } } },
      ]),
      Expense.aggregate([
        { $match: { userId } },
        { $group: { _id: { $month: "$date" }, totalAmount: { $sum: "$amount" } } },
      ]),
    ]);

    return res.json({ categorySummary, monthlySummary });
  } catch (error) {
    return res.status(500).json({ message: "Error generating analytics", error });
  }
};

exports.updateExpenseLimit = async (req, res) => {
  try {
    const { limit } = req.body;
    const userId = req.user.userId;

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { monthlyLimit: limit },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Expense limit updated successfully", updatedUser });
  } catch (err) {
    return res.status(500).json({ message: "Error updating expense limit", error: err.message });
  }
};

exports.getExpenseLimit = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { monthlyLimit } = await User.findById(userId);
    return res.json(monthlyLimit);
  } catch (err) {
    return res.status(500).json({ message: "Error in getting expense limit", err });
  }
} 