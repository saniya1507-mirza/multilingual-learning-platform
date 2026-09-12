import React, { useEffect, useState } from 'react'
import { getCourses } from '../api'
import CourseCard from '../components/CourseCard'
import Loading from '../components/Loading'

export default function Explore(){
  const [courses,setCourses]=useState([])
  const [loading,setLoading]=useState(true)
  const [err,setErr]=useState('')

  useEffect(()=>{
    let mounted=true
    getCourses().then(data=>{ if(mounted){ setCourses(data); setLoading(false) } }).catch(e=>{ setErr(e.message); setLoading(false) })
    return ()=> mounted=false
  },[])

  return (
    <div className="page explore">
      <div className="page-head">
        <h2>Explore Courses</h2>
        <div className="search">{/* placeholder search */}</div>
      </div>
      {loading? <Loading/> : (
        <div className="grid">
          {courses.length===0? <div className="empty">No courses yet</div> : courses.map(c=> <CourseCard key={c._id} course={c} onOpen={()=>{ window.location.href = '/courses/'+c._id }} />)}
        </div>
      )}
    </div>
  )
}
