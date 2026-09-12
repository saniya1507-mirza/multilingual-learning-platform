const Progress = require('../models/Progress');

async function getProgress(req, res, next) {
  const items = await Progress.find({ userId: req.user._id }).limit(500).lean();
  res.json(items);
}

async function postProgress(req, res, next) {
  const { courseId, lessonId, action } = req.body;
  let p = await Progress.findOne({ userId: req.user._id, courseId, lessonId });
  if (!p) p = new Progress({ userId: req.user._id, courseId, lessonId });
  p.lastViewedAt = new Date();
  if (action === 'complete') p.completed = true;
  await p.save();
  res.json(p);
}

module.exports = { getProgress, postProgress };
