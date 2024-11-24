const express = require("express");
const { addExpense, getExpenses, updateExpense, deleteExpense, getAnalytics, getExpenseLimit, updateExpenseLimit } = require("../controllers/expenseController");
const auth = require("../middleware/auth");
const { pathForUserExpensesApis } = require("../apis/expenseTracker.api");

const expenseRouter = express.Router();

expenseRouter.post(pathForUserExpensesApis.addExpense, auth, addExpense);
expenseRouter.post(pathForUserExpensesApis.getExpenses, auth, getExpenses);
expenseRouter.patch(pathForUserExpensesApis.updateExpense, auth, updateExpense);
expenseRouter.delete(pathForUserExpensesApis.deleteExpense, auth, deleteExpense);
expenseRouter.patch(pathForUserExpensesApis.updateExpenseLimit, auth, updateExpenseLimit);
expenseRouter.get(pathForUserExpensesApis.getExpenseLimit, auth, getExpenseLimit);

// router.post("/addExpense", auth, addExpense);
// router.get("/getExpenses", auth, getExpenses);
// router.patch("/updateExpense/:id", auth, updateExpense);
// router.delete("/deleteExpense/:id", auth, deleteExpense);
// router.get("/getAnalytics", auth, getAnalytics);

module.exports = expenseRouter;
