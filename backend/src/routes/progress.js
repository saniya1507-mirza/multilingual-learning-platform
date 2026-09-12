const express = require('express');
const router = express.Router();
const { getProgress, postProgress } = require('../controllers/progressController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getProgress);
router.post('/', authMiddleware, postProgress);

module.exports = router;
