const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.get('/', apiController.getAllApis);
router.post('/', apiController.createApi);
router.get('/:id', apiController.getApiById);
router.put('/:id', apiController.updateApi);
router.delete('/:id', apiController.deleteApi);

// API Key Management
router.get('/:id/reveal-key', apiController.revealApiKey);
router.delete('/:id/api-key', apiController.removeApiKey);

module.exports = router;
