import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse, translate } from '../api'

export default function Course() {
  const { id } = useParams()

  const [course, setCourse] = useState(null)
  const [err, setErr] = useState('')
  const [lang, setLang] = useState(
    localStorage.getItem('mlp_lang') || 'en'
  )

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

  useEffect(() => {
    loadCourse()
  }, [id, lang])

  async function loadCourse() {
    try {
      setErr('')

      const data = await getCourse(id)

      if (lang === 'en') {
        setCourse(data)
        return
      }

      const translatedTitle = await translate({
        sourceType: 'course',
        sourceId: data._id,
        text: data.title || '',
        targetLang: lang
      })

      const translatedDescription = await translate({
        sourceType: 'course-description',
        sourceId: data._id,
        text:
          data.descriptionOriginal ||
          data.description ||
          '',
        targetLang: lang
      })

      const translatedLessons = await Promise.all(
        (data.lessons || []).map(async (lesson) => {
          const translatedLessonTitle = await translate({
            sourceType: 'lesson-title',
            sourceId: lesson._id,
            text: lesson.title || '',
            targetLang: lang
          })

          return {
            ...lesson,
            title:
              translatedLessonTitle.translatedText ||
              lesson.title
          }
        })
      )

      setCourse({
        ...data,

        title:
          translatedTitle.translatedText ||
          data.title,

        descriptionOriginal:
          translatedDescription.translatedText ||
          data.descriptionOriginal ||
          data.description,

        lessons: translatedLessons
      })

    } catch (error) {
      console.error('Course loading error:', error)
      setErr('Unable to load this course.')
    }
  }

  if (err) {
    return (
      <div className="page error">
        {err}
      </div>
    )
  }

  if (!course) {
    return (
      <div className="page">
        Loading...
      </div>
    )
  }

  return (
    <div className="page course-page">

      <div className="course-hero">
        <div>

          <h2>{course.title}</h2>

          <p className="muted">
            {course.descriptionOriginal}
          </p>

          <div className="meta">
            <span>
              Language: {course.languageOriginal}
            </span>

            <span>
              Lessons: {course.lessons?.length || 0}
            </span>
          </div>

        </div>
      </div>

      <div className="lessons">

        <h3>Lessons</h3>

        <ul>
          {course.lessons?.map(lesson => (
            <li key={lesson._id}>
              <Link to={`/lessons/${lesson._id}`}>
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}