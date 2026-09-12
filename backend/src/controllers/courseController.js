const Course = require('../models/Course');

async function list(req, res, next) {
  const courses = await Course.find().populate('lessons').limit(50).lean();
  res.json(courses);
}

async function getById(req, res, next) {
  const course = await Course.findById(req.params.id).populate('lessons').lean();
  if (!course) return res.status(404).json({ message: 'Not found' });
  res.json(course);
}

async function create(req, res, next) {
  if (req.user.role !== 'teacher' && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const { title, descriptionOriginal } = req.body;
  const course = new Course({ title, descriptionOriginal, authorId: req.user._id, languageOriginal: 'en' });
  await course.save();
  res.json(course);
}

module.exports = { list, getById, create };
