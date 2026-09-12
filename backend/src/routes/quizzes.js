const express = require('express');
const router = express.Router();
const { getQuiz, submitQuiz } = require('../controllers/quizController');
const { authMiddleware } = require('../middleware/auth');

router.get('/:id', getQuiz);
router.post('/:id/submit', authMiddleware, submitQuiz);

module.exports = router;
