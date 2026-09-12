import React from 'react'
import CourseCard from '../components/CourseCard'
import ProgressBar from '../components/ProgressBar'
import { getCourses, me } from '../api'

export default function Dashboard(){
  const [user,setUser] = React.useState(null)
  const [courses,setCourses] = React.useState([])
  const [loading,setLoading] = React.useState(true)

  React.useEffect(()=>{
    let mounted = true
    Promise.all([me(), getCourses()]).then(([u, cs])=>{
      if (!mounted) return
      setUser(u)
      setCourses(cs)
      setLoading(false)
    }).catch(()=> setLoading(false))
    return ()=> mounted = false
  },[])

  if (loading) return <div className="page">Loading...</div>

  return (
    <div className="page dashboard">
      <div className="dashboard-hero">
        <div className="welcome card">
          <h2>Welcome back, {user? user.name : 'Learner'}</h2>
          <p className="muted">Keep up the momentum. Continue your learning journey.</p>
          <div className="stats">
            <div className="stat card"><h4>Streak</h4><div className="muted">5 days</div></div>
            <div className="stat card"><h4>Completed</h4><div className="muted">3 lessons</div></div>
            <div className="stat card"><h4>Quizzes</h4><div className="muted">2 taken</div></div>
          </div>
        </div>
        <div className="card">
          <h3>Your Profile</h3>
          {user? (
            <div style={{display:'flex',gap:12,alignItems:'center'}}>
              <div className="avatar large">{user.name?.slice(0,1)}</div>
              <div>
                <div style={{fontWeight:700}}>{user.name}</div>
                <div className="muted">{user.email}</div>
              </div>
            </div>
          ) : <div>Not signed in</div>}
        </div>
      </div>

      <h3 style={{marginTop:18}}>Continue Learning</h3>
      <div className="continue-courses">
        {courses.slice(0,2).map(c=> (
          <div key={c._id} className="card">
            <h4>{c.title}</h4>
            <p className="muted">{c.descriptionOriginal}</p>
            <div style={{marginTop:8}}>
              <ProgressBar value={Math.floor(Math.random()*80)+10} />
            </div>
            <div style={{marginTop:8}}>
              <a className="btn" href={`/courses/${c._id}`}>Continue</a>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{marginTop:18}}>Recommended Courses</h3>
      <div className="grid">
        {courses.map(c=> <CourseCard key={c._id} course={c} />)}
      </div>

    </div>
  )
}
