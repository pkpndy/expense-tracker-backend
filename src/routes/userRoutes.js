const express = require('express');
const { signup, login } = require('../controllers/userController');
const { pathForUserAuthApis } = require('../apis/expenseTracker.api');

const authRouter = express.Router();

// router.post('/signup', signup);
authRouter.post(pathForUserAuthApis.signup, signup);
authRouter.post(pathForUserAuthApis.login, login);
// router.post('/login', login);

module.exports = authRouter;
