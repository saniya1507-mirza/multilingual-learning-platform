const mongoose = require('mongoose');

const translationSchema = new mongoose.Schema({
  sourceType: String,
  sourceId: mongoose.Schema.Types.ObjectId,
  langCode: String,
  translatedText: String,
  modelVersion: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TranslationCache', translationSchema);
