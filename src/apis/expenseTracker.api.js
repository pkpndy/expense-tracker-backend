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
    updateExpenseLimit: `${pathForUserApi}/updateExpenseLimit`,
    getExpenseAnalytics: `${pathForUserApi}/getExpenseAnalytics`
};

module.exports = {
    pathForUserAuthApis,
    pathForUserExpensesApis
}