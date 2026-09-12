const TranslationCache = require('../models/TranslationCache');
const Lesson = require('../models/Lesson');

async function translate(req, res, next) {
  const { sourceType, sourceId, text, targetLang } = req.body;
  if (!text || !targetLang) return res.status(400).json({ message: 'Missing params' });
  const cached = await TranslationCache.findOne({ sourceType, sourceId, langCode: targetLang });
  if (cached) return res.json({ translatedText: cached.translatedText, cached: true });
  const translatedText = `[${targetLang.toUpperCase()} TRANSLATION]\n` + text;
  const t = new TranslationCache({ sourceType, sourceId, langCode: targetLang, translatedText, modelVersion: 'stub-v1' });
  await t.save();
  if (sourceType === 'lesson' && sourceId) {
    await Lesson.findByIdAndUpdate(sourceId, {
      $set: { [`contentTranslations.${targetLang}`]: { text: translatedText, translatedAt: new Date(), provider: 'stub' } }
    });
  }
  res.json({ translatedText, cached: false });
}

async function explain(req, res, next) {
  const { text, targetLang, style } = req.body;
  if (!text) return res.status(400).json({ message: 'Missing text' });
  const explanation = `Simple explanation (${targetLang || 'en'}): ${text.split('.').slice(0,2).join('.')}...`;
  res.json({ explanation });
}

module.exports = { translate, explain };
