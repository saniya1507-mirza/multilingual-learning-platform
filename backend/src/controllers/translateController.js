const TranslationCache = require('../models/TranslationCache')
const Lesson = require('../models/Lesson')

const MYMEMORY_URL = 'https://api.mymemory.translated.net/get'

function isValidObjectId(value) {
  return /^[0-9a-fA-F]{24}$/.test(value || '')
}

async function translate(req, res, next) {
  try {
    const { sourceType, sourceId, text, targetLang } = req.body

    if (!text || !targetLang) {
      return res.status(400).json({
        message: 'Missing params'
      })
    }

    // English does not need translation
    if (targetLang === 'en') {
      return res.json({
        translatedText: text,
        cached: false
      })
    }

    // Check cache only when sourceId is a valid MongoDB ObjectId
    let cached = null

    if (sourceId && isValidObjectId(sourceId)) {
      cached = await TranslationCache.findOne({
        sourceType,
        sourceId,
        langCode: targetLang,
        modelVersion: 'mymemory-v1'
      })
    }

    if (cached) {
      return res.json({
        translatedText: cached.translatedText,
        cached: true
      })
    }

    // MyMemory translation
    const url =
      `${MYMEMORY_URL}?q=${encodeURIComponent(text)}` +
      `&langpair=en|${encodeURIComponent(targetLang)}` +
      `&mt=1`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.responseStatus !== 200) {
      console.error('MyMemory error:', data)

      return res.status(502).json({
        message:
          data.responseDetails || 'Translation service failed'
      })
    }

    const translatedText =
      data.responseData?.translatedText

    if (!translatedText) {
      return res.status(502).json({
        message: 'No translation returned'
      })
    }

    // Save translation to cache.
    // Invalid sourceIds such as quiz-choice IDs are not saved
    // because TranslationCache.sourceId expects an ObjectId.
    const translation = new TranslationCache({
      sourceType,
      sourceId: isValidObjectId(sourceId)
        ? sourceId
        : undefined,
      langCode: targetLang,
      translatedText,
      modelVersion: 'mymemory-v1'
    })

    await translation.save()

    // Save lesson translation in the Lesson document
    if (
      sourceType === 'lesson' &&
      sourceId &&
      isValidObjectId(sourceId)
    ) {
      await Lesson.findByIdAndUpdate(sourceId, {
        $set: {
          [`contentTranslations.${targetLang}`]: {
            text: translatedText,
            translatedAt: new Date(),
            provider: 'mymemory'
          }
        }
      })
    }

    return res.json({
      translatedText,
      cached: false
    })

  } catch (error) {
    console.error('Translation error:', error)
    next(error)
  }
}


// Explain Simply
async function explain(req, res, next) {
  try {
    const { text, targetLang } = req.body

    if (!text) {
      return res.status(400).json({
        message: 'Missing text'
      })
    }

    const language = targetLang || 'en'

    // English explanation
    if (language === 'en') {
      return res.json({
        explanation: `Explain simply: ${text}`
      })
    }

    const url =
      `${MYMEMORY_URL}?q=${encodeURIComponent(
        `Explain simply: ${text}`
      )}` +
      `&langpair=en|${encodeURIComponent(language)}` +
      `&mt=1`

    const response = await fetch(url)
    const data = await response.json()

    if (!response.ok || data.responseStatus !== 200) {
      console.error('MyMemory explanation error:', data)

      return res.status(502).json({
        message: 'Unable to explain this lesson'
      })
    }

    return res.json({
      explanation:
        data.responseData?.translatedText || text
    })

  } catch (error) {
    console.error('Explanation error:', error)
    next(error)
  }
}


module.exports = {
  translate,
  explain
}