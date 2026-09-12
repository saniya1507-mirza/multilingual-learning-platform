const express = require('express');
const router = express.Router();
const { getLesson, createLesson } = require('../controllers/lessonController');
const { authMiddleware } = require('../middleware/auth');

router.get('/:id', getLesson);
router.post('/', authMiddleware, createLesson);

module.exports = router;
