const Lesson = require('../models/Lesson');
const Course = require('../models/Course');
const Quiz = require('../models/Quiz');

async function getLesson(req, res, next) {
  const lang = req.query.lang || null;
  const lesson = await Lesson.findById(req.params.id).lean();
  if (!lesson) return res.status(404).json({ message: 'Not found' });
  const quiz = await Quiz.findOne({ lessonId: lesson._id }).select('_id').lean();
  const quizData = quiz ? { quizId: quiz._id } : {};
  const translation = lang && lesson.contentTranslations
    ? typeof lesson.contentTranslations.get === 'function'
      ? lesson.contentTranslations.get(lang)
      : lesson.contentTranslations[lang]
    : null;
  if (translation) {
    return res.json({ ...lesson, ...quizData, content: translation.text, lang });
  }
  // fixed: use languageOriginal field
  res.json({ ...lesson, ...quizData, content: lesson.contentOriginal, lang: lesson.languageOriginal || 'original' });
}

async function createLesson(req, res, next) {
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { courseId, title, contentOriginal, order } = req.body;
  const lesson = new Lesson({ courseId, title, contentOriginal, order });
  await lesson.save();
  await Course.findByIdAndUpdate(courseId, { $push: { lessons: lesson._id } });
  res.json(lesson);
}

module.exports = { getLesson, createLesson };
