const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  title: String,
  contentOriginal: String,
  contentTranslations: { type: Map, of: new mongoose.Schema({ text: String, translatedAt: Date, provider: String }, { _id: false }) },
  order: Number,
  resources: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', lessonSchema);
