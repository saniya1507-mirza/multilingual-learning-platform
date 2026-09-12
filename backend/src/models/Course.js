const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  descriptionOriginal: String,
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  languageOriginal: { type: String, default: 'en' },
  languagesAvailable: [String],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  createdAt: { type: Date, default: Date.now },
  published: { type: Boolean, default: false }
});

module.exports = mongoose.model('Course', courseSchema);
