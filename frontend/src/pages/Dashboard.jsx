import React from 'react'
import CourseCard from '../components/CourseCard'
import ProgressBar from '../components/ProgressBar'
import { getCourses, getProgress, me, translate } from '../api'

export default function Dashboard(){
  const [user,setUser] = React.useState(null)
  const [courses,setCourses] = React.useState([])
  const [progress,setProgress] = React.useState([])
  const [lang,setLang] = React.useState(localStorage.getItem('mlp_lang') || 'en')
  const [loading,setLoading] = React.useState(true)

  React.useEffect(()=>{
    let mounted = true

    async function loadDashboard() {
      try {
        const [u, cs, ps] = await Promise.all([me(), getCourses(), getProgress().catch(() => [])])
        const localizedCourses = lang === 'en'
          ? cs
          : await Promise.all(cs.map(async course => {
            if (!course.descriptionOriginal) return course
            const result = await translate({
              sourceType: 'course',
              sourceId: course._id,
              text: course.descriptionOriginal,
              targetLang: lang
            })
            return { ...course, descriptionOriginal: result.translatedText }
          }))

        if (!mounted) return
        setUser(u)
        setCourses(localizedCourses)
        setProgress(ps)
        setLoading(false)
      } catch {
        if (mounted) setLoading(false)
      }
    }

    loadDashboard()
    function onLanguageChange(event) {
      if (event?.detail) setLang(event.detail)
    }
    window.addEventListener('mlp:lang', onLanguageChange)

    return ()=> {
      mounted = false
      window.removeEventListener('mlp:lang', onLanguageChange)
    }
  },[lang])

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
              <ProgressBar value={c.lessons?.length ? Math.round((progress.filter(p=>p.courseId === c._id && p.completed).length / c.lessons.length) * 100) : 0} />
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
