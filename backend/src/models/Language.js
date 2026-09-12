const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  code: String,
  name: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Language', languageSchema);
