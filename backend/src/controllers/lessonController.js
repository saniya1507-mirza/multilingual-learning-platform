const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

async function getLesson(req, res, next) {
  const lang = req.query.lang || null;
  const lesson = await Lesson.findById(req.params.id).lean();
  if (!lesson) return res.status(404).json({ message: 'Not found' });
  if (lang && lesson.contentTranslations && lesson.contentTranslations.get(lang)) {
    return res.json({ ...lesson, content: lesson.contentTranslations.get(lang).text, lang });
  }
  res.json({ ...lesson, content: lesson.contentOriginal, lang: lesson.language || 'original' });
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
