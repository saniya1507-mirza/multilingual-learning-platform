const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  completed: { type: Boolean, default: false },
  lastViewedAt: Date,
  quizScores: [{ quizId: mongoose.Schema.Types.ObjectId, score: Number, attemptedAt: Date }]
});

module.exports = mongoose.model('Progress', progressSchema);
