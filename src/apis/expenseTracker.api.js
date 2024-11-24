const pathForHomeApi = '/api';

const pathForUserApi = `${pathForHomeApi}/user`;

const pathForUserAuthApis = {
    login: `${pathForUserApi}/login`,
    signup: `${pathForUserApi}/signup`
};

const pathForUserExpensesApis = {
    addExpense: `${pathForUserApi}/addExpense`,
    getExpenses: `${pathForUserApi}/getExpenses`,
    updateExpense: `${pathForUserApi}/updateExpense`,
    deleteExpense: `${pathForUserApi}/deleteExpense`,
    getExpenseLimit: `${pathForUserApi}/getExpenseLimit`,
    updateExpenseLimit: `${pathForUserApi}/updateExpenseLimit`
};

module.exports = {
    pathForUserAuthApis,
    pathForUserExpensesApis
}

// app.use('/api/users', userRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/analytics', analyticsRoutes);

// router.post('/signup', signup);
// router.post('/login', login);

// router.post("/addExpense", auth, addExpense);
// router.get("/getExpenses", auth, getExpenses);
// router.patch("/updateExpense/:id", auth, updateExpense);
// router.delete("/deleteExpense/:id", auth, deleteExpense);
// router.get("/getAnalytics", auth, getAnalytics);


// app.use('/api/analytics', analyticsRoutes);