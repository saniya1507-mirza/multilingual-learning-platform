const express = require('express');
const router = express.Router();
const { list, getById, create } = require('../controllers/courseController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', list);
router.get('/:id', getById);
router.post('/', authMiddleware, create);

module.exports = router;
