const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { payFees } = require('../controllers/paymentController');

router.post('/pay', protect, payFees);

module.exports = router;