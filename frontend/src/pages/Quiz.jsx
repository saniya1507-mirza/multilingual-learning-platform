import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuiz, submitQuiz, translate } from '../api'

export default function Quiz() {
  const { id } = useParams()
  const nav = useNavigate()

  const [quiz, setQuiz] = useState(null)
  const [answers, setAnswers] = useState([])
  const [lang, setLang] = useState(
    localStorage.getItem('mlp_lang') || 'en'
  )
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadQuiz()
  }, [id, lang])

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

  async function loadQuiz() {
    try {
      setError('')

      const q = await getQuiz(id)

      if (lang === 'en') {
        setQuiz(q)
        setAnswers(
          new Array(q.questions.length).fill(null)
        )
        return
      }

      const translatedTitle = await translate({
        sourceType: 'quiz',
        sourceId: q._id,
        text: q.title,
        targetLang: lang
      })

      const translatedQuestions = await Promise.all(
        q.questions.map(async (question) => {
          const translatedQuestion = await translate({
            sourceType: 'quiz-question',
            sourceId: question._id,
            text: question.text,
            targetLang: lang
          })

          const translatedChoices = await Promise.all(
            question.choices.map((choice, index) =>
              translate({
                sourceType: 'quiz-choice',
                sourceId: `${question._id}-${index}`,
                text: choice,
                targetLang: lang
              })
            )
          )

          return {
            ...question,
            text: translatedQuestion.translatedText,
            choices: translatedChoices.map(
              item => item.translatedText
            )
          }
        })
      )

      setQuiz({
        ...q,
        title: translatedTitle.translatedText,
        questions: translatedQuestions
      })

      setAnswers(
        new Array(q.questions.length).fill(null)
      )

    } catch (err) {
      console.error('Quiz loading error:', err)
      setError('Unable to load quiz.')
    }
  }

  function pick(questionIndex, choiceIndex) {
    const updatedAnswers = [...answers]

    updatedAnswers[questionIndex] = choiceIndex

    setAnswers(updatedAnswers)
  }

  async function submit() {
    if (submitting) return

    // Make sure every question has an answer
    const unanswered = answers.some(
      answer => answer === null
    )

    if (unanswered) {
      setError('Please answer all questions before submitting.')
      return
    }

    try {
      setError('')
      setSubmitting(true)

      console.log('Submitting quiz...')
      console.log('Quiz ID:', id)
      console.log('Answers:', answers)

      const res = await submitQuiz(id, answers)

      console.log('Quiz result:', res)

      nav(`/quizzes/${id}/result`, {
        state: { res }
      })

    } catch (err) {
      console.error('Quiz submit error:', err)

      setError(
        err?.message ||
        'Unable to submit quiz. Please try again.'
      )

    } finally {
      setSubmitting(false)
    }
  }

  if (!quiz) {
    return (
      <div className="page">
        {error || 'Loading...'}
      </div>
    )
  }

  return (
    <div className="page quiz-page">

      <h2>{quiz.title}</h2>

      {error && (
        <div className="error-state">
          {error}
        </div>
      )}

      {quiz.questions.map((q, i) => (
        <div
          key={q._id}
          className="question"
        >

          <p className="qtext">
            {i + 1}. {q.text}
          </p>

          <div className="choices">

            {q.choices.map((choice, index) => (
              <label
                key={index}
                className={`choice ${
                  answers[i] === index
                    ? 'selected'
                    : ''
                }`}
              >

                <input
                  type="radio"
                  name={`q${i}`}
                  checked={
                    answers[i] === index
                  }
                  onChange={() =>
                    pick(i, index)
                  }
                />

                {choice}

              </label>
            ))}

          </div>

        </div>
      ))}

      <div className="quiz-actions">

        <button
          className="btn primary"
          onClick={submit}
          disabled={submitting}
        >
          {submitting
            ? 'Submitting...'
            : 'Submit'}
        </button>

      </div>

    </div>
  )
}