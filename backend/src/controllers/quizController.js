const Quiz = require('../models/Quiz');

async function getQuiz(req, res, next) {
  const quiz = await Quiz.findById(req.params.id).lean();
  if (!quiz) return res.status(404).json({ message: 'Not found' });
  res.json(quiz);
}

async function submitQuiz(req, res, next) {
  const quiz = await Quiz.findById(req.params.id).lean();
  if (!quiz) return res.status(404).json({ message: 'Not found' });
  const { answers } = req.body;
  let correct = 0;
  quiz.questions.forEach((q, idx) => {
    if (answers && answers[idx] === q.correctAnswer) correct++;
  });
  const score = Math.round((correct / quiz.questions.length) * 100);
  res.json({ score, correct, total: quiz.questions.length });
}

module.exports = { getQuiz, submitQuiz };
