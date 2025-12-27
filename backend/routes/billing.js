const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

router.get('/summary', billingController.getBillingSummary);
router.get('/settings', billingController.getSettings);
router.put('/settings', billingController.updateSettings);

module.exports = router;
