import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLesson, translate, explain } from '../api'

export default function Lesson() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [lang, setLang] = useState(
    localStorage.getItem('mlp_lang') || 'en'
  )

  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [explainText, setExplainText] = useState('')
  const [explaining, setExplaining] = useState(false)

  // Load lesson whenever lesson ID or language changes
  useEffect(() => {
    loadLesson()
  }, [id, lang])

  // Listen for language changes from the global language selector
  useEffect(() => {
    function onLanguageChange(event) {
      if (event?.detail) {
        setLang(event.detail)
      }
    }

    window.addEventListener('mlp:lang', onLanguageChange)

    return () => {
      window.removeEventListener('mlp:lang', onLanguageChange)
    }
  }, [])

  async function loadLesson() {
    setLoading(true)
    setError('')

    try {
      const data = await getLesson(id, lang)
      setLesson(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load this lesson.')
    } finally {
      setLoading(false)
    }
  }

  async function handleExplain() {
    if (!lesson) return

    setExplaining(true)

    try {
      const text =
        lesson.content ||
        lesson.contentOriginal ||
        lesson.description ||
        ''

      const result = await explain({ text, targetLang: lang })

      setExplainText(
        result?.text ||
        result?.explanation ||
        result ||
        'No explanation available.'
      )
    } catch (err) {
      console.error(err)
      setExplainText('Unable to explain this lesson right now.')
    } finally {
      setExplaining(false)
    }
  }

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state">
          Loading lesson...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <button onClick={loadLesson}>
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h2>Lesson not found</h2>

          <button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  const title =
    lesson.title ||
    lesson.name ||
    'Lesson'

  const content =
    lesson.content ||
    lesson.contentOriginal ||
    lesson.description ||
    'No lesson content available.'

  return (
    <div className="page-container">
      <div className="lesson-page">

        {/* Back button */}
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {/* Lesson header */}
        <div className="lesson-header">
          <div>
            <span className="lesson-label">
              LESSON
            </span>

            <h1>{title}</h1>

            <p>
              Language: {lang.toUpperCase()}
            </p>
          </div>

          <button
            className="explain-button"
            onClick={handleExplain}
            disabled={explaining}
          >
            {explaining
              ? 'Explaining...'
              : '✨ Explain Simply'}
          </button>
        </div>

        {/* Lesson content */}
        <div className="lesson-content">
          <div className="content-card">
            <div className="content-text">
              {content}
            </div>
          </div>
        </div>

        {/* AI explanation */}
        {explainText && (
          <div className="explanation-card">
            <div className="explanation-header">
              <span>✨</span>
              <h2>Simple Explanation</h2>
            </div>

            <p>{explainText}</p>
          </div>
        )}

        {/* Quiz button */}
        <div className="lesson-actions">
          {lesson.quizId ? (
            <button
              className="primary-button"
              onClick={() =>
                navigate(`/quizzes/${lesson.quizId}`)
              }
            >
              Take Quiz →
            </button>
          ) : (
            <button
              className="primary-button"
              onClick={() =>
                navigate('/dashboard')
              }
            >
              Continue Learning →
            </button>
          )}
        </div>

      </div>
    </div>
  )
}