import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse } from '../api'
import CourseCard from '../components/CourseCard'

export default function Course(){
  const { id } = useParams()
  const [course,setCourse]=useState(null)
  const [err,setErr]=useState('')

  useEffect(()=>{ getCourse(id).then(setCourse).catch(e=>setErr(e.message)) },[id])

  if (err) return <div className="page error">{err}</div>
  if (!course) return <div className="page">Loading...</div>

  return (
    <div className="page course-page">
      <div className="course-hero">
        <div>
          <h2>{course.title}</h2>
          <p className="muted">{course.descriptionOriginal}</p>
          <div className="meta">
            <span>Language: {course.languageOriginal}</span>
            <span>Lessons: {course.lessons?.length || 0}</span>
          </div>
        </div>
      </div>

      <div className="lessons">
        <h3>Lessons</h3>
        <ul>
          {course.lessons?.map(l=> (
            <li key={l._id}><Link to={`/lessons/${l._id}`}>{l.title}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  )
}
