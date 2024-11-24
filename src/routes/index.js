const express = require('express');
const authRouter = require('./userRoutes');
const expenseRouter = require('./expenseRoutes');

const homeRouter = express.Router();

homeRouter.use([
    authRouter,
    expenseRouter
]);

module.exports = {
    homeRouter
}