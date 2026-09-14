import React, { useEffect, useState } from 'react'
import { getCourses, translate } from '../api'
import CourseCard from '../components/CourseCard'
import Loading from '../components/Loading'

export default function Explore() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
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
    loadCourses()
  }, [lang])

  async function loadCourses() {
    setLoading(true)
    setErr('')

    try {
      const data = await getCourses()

      if (lang === 'en') {
        setCourses(data)
        return
      }

      const translatedCourses = await Promise.all(
        data.map(async (course) => {
          const translatedTitle = await translate({
            sourceType: 'course',
            sourceId: course._id,
            text: course.title || '',
            targetLang: lang
          })

          const translatedDescription = await translate({
            sourceType: 'course-description',
            sourceId: course._id,
            text:
              course.descriptionOriginal ||
              course.description ||
              '',
            targetLang: lang
          })

          return {
            ...course,
            title:
              translatedTitle.translatedText ||
              course.title,

            descriptionOriginal:
              translatedDescription.translatedText ||
              course.descriptionOriginal ||
              course.description
          }
        })
      )

      setCourses(translatedCourses)
    } catch (error) {
      console.error('Explore loading error:', error)
      setErr('Unable to load courses.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page explore">

      <div className="page-head">
        <h2>Explore Courses</h2>

        <div className="search">
          {/* placeholder search */}
        </div>
      </div>

      {err && (
        <div className="error-state">
          {err}
        </div>
      )}

      {loading ? (
        <Loading />
      ) : (
        <div className="grid">

          {courses.length === 0 ? (
            <div className="empty">
              No courses yet
            </div>
          ) : (
            courses.map(course => (
              <CourseCard
                key={course._id}
                course={course}
                onOpen={() => {
                  window.location.href =
                    '/courses/' + course._id
                }}
              />
            ))
          )}

        </div>
      )}

    </div>
  )
}