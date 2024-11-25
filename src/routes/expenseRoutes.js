const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense,getExpenseLimit, updateExpenseLimit, getExpenseAnalytics } = require("../controllers/expenseController");
const auth = require("../middleware/auth");
const { pathForUserExpensesApis } = require("../apis/expenseTracker.api");

const expenseRouter = express.Router();

expenseRouter.post(pathForUserExpensesApis.addExpense, auth, addExpense);
expenseRouter.post(pathForUserExpensesApis.getExpenses, auth, getExpenses);
expenseRouter.patch(pathForUserExpensesApis.updateExpense, auth, updateExpense);
expenseRouter.delete(pathForUserExpensesApis.deleteExpense, auth, deleteExpense);
expenseRouter.patch(pathForUserExpensesApis.updateExpenseLimit, auth, updateExpenseLimit);
expenseRouter.get(pathForUserExpensesApis.getExpenseLimit, auth, getExpenseLimit);
expenseRouter.get(pathForUserExpensesApis.getExpenseAnalytics, auth, getExpenseAnalytics);

module.exports = expenseRouter;
