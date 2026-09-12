import React from 'react'

export default function CourseCard({ course, onOpen }){
  return (
    <div className="course-card">
      <div className="course-top">
        <div className="course-thumb">{course.title?.slice(0,1)}</div>
        <div className="course-meta">
          <h4>{course.title}</h4>
          <p className="muted">{course.descriptionOriginal?.slice(0,120)}</p>
        </div>
      </div>
      <div className="course-bottom">
        <div className="tags"><span className="tag">{course.languageOriginal || 'EN'}</span></div>
        <button className="btn primary" onClick={()=> onOpen && onOpen(course)}>Open</button>
      </div>
    </div>
  )
}
