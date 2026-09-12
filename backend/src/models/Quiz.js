const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: String,
  choices: [String],
  correctAnswer: Number,
  explanation: String
}, { _id: true });

const quizSchema = new mongoose.Schema({
  lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  title: String,
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);
