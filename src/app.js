const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const userRoutes = require('./routes/userRoutes');
// const expenseRoutes = require('./routes/expenseRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');
const { homeRouter } = require('./routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(homeRouter);

// app.use('/api/users', userRoutes);
// app.use('/api/expenses', expenseRoutes);
// app.use('/api/analytics', analyticsRoutes);

module.exports = app;
