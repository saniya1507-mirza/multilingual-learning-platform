const express = require('express');
const router = express.Router();
const { translate, explain } = require('../controllers/translateController');

router.post('/', translate);
router.post('/explain', explain);

module.exports = router;
