const express = require('express');
const { setMonthlyLimit, getAnalytics } = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to set a monthly spending limit
router.post('/limit', auth, setMonthlyLimit);

// Route to get expense analytics
router.get('/', auth, getAnalytics);

module.exports = router;
