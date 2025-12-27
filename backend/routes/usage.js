const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController');

router.post('/', usageController.logApiCall);
router.get('/', usageController.getAllApiCalls);
router.get('/stats', usageController.getUsageStats);

module.exports = router;
