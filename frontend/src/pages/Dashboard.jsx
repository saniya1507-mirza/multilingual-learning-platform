import React from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import LanguageSelector from '../components/LanguageSelector'
import { getCourses, getProgress, me, translate, logout } from '../api'

const UI = {
  en: {
    learningSpace: 'YOUR LEARNING SPACE',
    welcome: 'Welcome back',
    keepLearning: 'Keep learning, keep growing, and reach your goals.',
    courses: 'Courses',
    available: 'Available to learn',
    completed: 'Completed',
    lessonsOf: 'of',
    lessons: 'lessons',
    quizAverage: 'Quiz Average',
    attempts: 'quiz attempts',
    noQuizzes: 'No quizzes yet',
    learningStreak: 'Learning Streak',
    daysRow: 'days in a row',
    yourProgress: 'Your Progress',
    keepMoving: 'Keep moving forward!',
    courseProgress: 'Course Progress',
    noCourses: 'No courses available yet.',
    myProfile: 'MY PROFILE',
    learningLanguage: 'Learning language',
    continueLearning: 'Continue Learning',
    pickUp: 'Pick up where you left off.',
    course: 'COURSE',
    progress: 'Progress',
    exploreLearn: 'Explore & Learn',
    discover: 'Discover more courses available for you.',
    loading: 'Loading your learning space...'
  },

  hi: {
    learningSpace: 'आपका सीखने का स्थान',
    welcome: 'वापसी पर आपका स्वागत है',
    keepLearning: 'सीखते रहें, आगे बढ़ते रहें और अपने लक्ष्य हासिल करें।',
    courses: 'पाठ्यक्रम',
    available: 'सीखने के लिए उपलब्ध',
    completed: 'पूर्ण',
    lessonsOf: 'कुल',
    lessons: 'पाठ',
    quizAverage: 'क्विज़ औसत',
    attempts: 'क्विज़ प्रयास',
    noQuizzes: 'अभी कोई क्विज़ नहीं',
    learningStreak: 'लर्निंग स्ट्रीक',
    daysRow: 'लगातार दिन',
    yourProgress: 'आपकी प्रगति',
    keepMoving: 'आगे बढ़ते रहें!',
    courseProgress: 'पाठ्यक्रम प्रगति',
    noCourses: 'अभी कोई पाठ्यक्रम उपलब्ध नहीं है।',
    myProfile: 'मेरी प्रोफ़ाइल',
    learningLanguage: 'सीखने की भाषा',
    continueLearning: 'सीखना जारी रखें',
    pickUp: 'जहाँ आपने छोड़ा था, वहीं से शुरू करें।',
    course: 'पाठ्यक्रम',
    progress: 'प्रगति',
    exploreLearn: 'खोजें और सीखें',
    discover: 'अपने लिए उपलब्ध और पाठ्यक्रम खोजें।',
    loading: 'आपका सीखने का स्थान लोड हो रहा है...'
  },

  ur: {
    learningSpace: 'آپ کا سیکھنے کا مقام',
    welcome: 'خوش آمدید',
    keepLearning: 'سیکھتے رہیں، آگے بڑھتے رہیں اور اپنے اہداف حاصل کریں۔',
    courses: 'کورسز',
    available: 'سیکھنے کے لیے دستیاب',
    completed: 'مکمل',
    lessonsOf: 'کل',
    lessons: 'اسباق',
    quizAverage: 'کوئز اوسط',
    attempts: 'کوئز کی کوششیں',
    noQuizzes: 'ابھی کوئی کوئز نہیں',
    learningStreak: 'مسلسل سیکھنے کے دن',
    daysRow: 'مسلسل دن',
    yourProgress: 'آپ کی پیش رفت',
    keepMoving: 'آگے بڑھتے رہیں!',
    courseProgress: 'کورس کی پیش رفت',
    noCourses: 'ابھی کوئی کورس دستیاب نہیں ہے۔',
    myProfile: 'میری پروفائل',
    learningLanguage: 'سیکھنے کی زبان',
    continueLearning: 'سیکھنا جاری رکھیں',
    pickUp: 'جہاں آپ نے چھوڑا تھا، وہیں سے شروع کریں۔',
    course: 'کورس',
    progress: 'پیش رفت',
    exploreLearn: 'دریافت کریں اور سیکھیں',
    discover: 'اپنے لیے دستیاب مزید کورسز دریافت کریں۔',
    loading: 'آپ کا سیکھنے کا مقام لوڈ ہو رہا ہے...'
  },

  te: {
    learningSpace: 'మీ లెర్నింగ్ స్పేస్',
    welcome: 'తిరిగి స్వాగతం',
    keepLearning: 'నేర్చుకుంటూ, ఎదుగుతూ మీ లక్ష్యాలను చేరుకోండి.',
    courses: 'కోర్సులు',
    available: 'నేర్చుకోవడానికి అందుబాటులో ఉన్నాయి',
    completed: 'పూర్తయింది',
    lessonsOf: 'మొత్తం',
    lessons: 'పాఠాలు',
    quizAverage: 'క్విజ్ సగటు',
    attempts: 'క్విజ్ ప్రయత్నాలు',
    noQuizzes: 'ఇంకా క్విజ్‌లు లేవు',
    learningStreak: 'లెర్నింగ్ స్ట్రీక్',
    daysRow: 'వరుస రోజులు',
    yourProgress: 'మీ పురోగతి',
    keepMoving: 'ముందుకు సాగండి!',
    courseProgress: 'కోర్సు పురోగతి',
    noCourses: 'ఇంకా కోర్సులు అందుబాటులో లేవు.',
    myProfile: 'నా ప్రొఫైల్',
    learningLanguage: 'నేర్చుకునే భాష',
    continueLearning: 'నేర్చుకోవడం కొనసాగించండి',
    pickUp: 'మీరు ఆపిన చోటు నుండి కొనసాగించండి.',
    course: 'కోర్సు',
    progress: 'పురోగతి',
    exploreLearn: 'అన్వేషించండి మరియు నేర్చుకోండి',
    discover: 'మీ కోసం అందుబాటులో ఉన్న మరిన్ని కోర్సులను కనుగొనండి.',
    loading: 'మీ లెర్నింగ్ స్పేస్ లోడ్ అవుతోంది...'
  }
}

export default function Dashboard() {
  const nav = useNavigate()
  const [user, setUser] = React.useState(null)
  const [courses, setCourses] = React.useState([])
  const [progress, setProgress] = React.useState([])
  const [lang, setLang] = React.useState(
    localStorage.getItem('mlp_lang') || 'en'
  )
  const [loading, setLoading] = React.useState(true)

  const t = UI[lang] || UI.en

  function handleNavigate(path) {
    if (path) nav(path)
  }

  function handleLogout() {
    logout()
    nav('/login')
  }

  function handleContinueLearning() {
    if (activeLesson) {
      nav(`/lessons/${activeLesson._id}`)
      return
    }

    if (activeCourse) {
      nav(`/courses/${activeCourse._id}`)
    }
  }

  React.useEffect(() => {
    let mounted = true

    async function loadDashboard() {
      try {
        setLoading(true)

        const [u, cs, ps] = await Promise.all([
          me(),
          getCourses(),
          getProgress().catch(() => [])
        ])

        let localizedCourses = cs

        if (lang !== 'en') {
          localizedCourses = await Promise.all(
            cs.map(async (course) => {
              try {
                const [titleResult, descriptionResult] =
                  await Promise.all([
                    translate({
                      sourceType: 'course',
                      sourceId: course._id,
                      text: course.title,
                      targetLang: lang
                    }),
                    translate({
                      sourceType: 'course',
                      sourceId: course._id,
                      text: course.descriptionOriginal || '',
                      targetLang: lang
                    })
                  ])

                return {
                  ...course,
                  title:
                    titleResult?.translatedText || course.title,
                  descriptionOriginal:
                    descriptionResult?.translatedText ||
                    course.descriptionOriginal
                }
              } catch {
                return course
              }
            })
          )
        }

        if (!mounted) return

        setUser(u)
        setCourses(localizedCourses)
        setProgress(ps)
        setLoading(false)

      } catch (error) {
        console.error('Dashboard error:', error)

        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    function onLanguageChange(event) {
      if (event?.detail) {
        setLang(event.detail)
      }
    }

    window.addEventListener('mlp:lang', onLanguageChange)

    return () => {
      mounted = false
      window.removeEventListener('mlp:lang', onLanguageChange)
    }
  }, [lang])

  const completedLessons = progress.filter(
    p => p.completed
  ).length

  const totalLessons = courses.reduce(
    (total, course) =>
      total + (course.lessons?.length || 0),
    0
  )

  const overallProgress =
    totalLessons > 0
      ? Math.round(
          (completedLessons / totalLessons) * 100
        )
      : 0

  const quizScores = progress.flatMap(
    p => p.quizScores || []
  )

  const averageQuiz =
    quizScores.length > 0
      ? Math.round(
          quizScores.reduce(
            (sum, score) =>
              sum +
              Number(
                score.score ??
                score.percentage ??
                0
              ),
            0
          ) / quizScores.length
        )
      : 0

  function getCourseProgress(course) {
    const total = course.lessons?.length || 0

    if (!total) return 0

    const completed = progress.filter(
      p =>
        p.courseId === course._id &&
        p.completed
    ).length

    return Math.round(
      (completed / total) * 100
    )
  }

  const activeCourse =
    courses.find(course => getCourseProgress(course) < 100) ??
    courses[0] ??
    null

  const activeCourseProgress = activeCourse
    ? getCourseProgress(activeCourse)
    : 0

  const activeLesson =
    activeCourse?.lessons?.find(lesson =>
      !progress.some(
        p =>
          p.courseId === activeCourse._id &&
          p.lessonId === lesson._id &&
          p.completed
      )
    ) ??
    activeCourse?.lessons?.[0] ??
    null

  const activeLessonNumber = activeCourse?.lessons?.length
    ? (activeCourse.lessons.findIndex(
        lesson => lesson._id === activeLesson?._id
      ) + 1 || 1)
    : 0

  const streakDays = React.useMemo(() => {
    const uniqueDates = new Set()

    progress.forEach(item => {
      if (item.lastViewedAt) {
        const date = new Date(item.lastViewedAt)
        uniqueDates.add(
          `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        )
      }

      if (Array.isArray(item.quizScores)) {
        item.quizScores.forEach(score => {
          if (score.attemptedAt) {
            const date = new Date(score.attemptedAt)
            uniqueDates.add(
              `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
            )
          }
        })
      }
    })

    return Math.max(1, Math.min(7, uniqueDates.size || 1))
  }, [progress])

  const recentActivity = React.useMemo(() => {
    const items = []

    progress.forEach(item => {
      if (item.lastViewedAt) {
        const course = courses.find(c => c._id === item.courseId)
        items.push({
          type: item.completed ? 'complete' : 'progress',
          label: course?.title || 'Course',
          detail: item.completed ? 'Completed lesson' : 'Updated course progress',
          date: new Date(item.lastViewedAt)
        })
      }

      if (Array.isArray(item.quizScores)) {
        item.quizScores.forEach(score => {
          if (score.attemptedAt) {
            const course = courses.find(c => c._id === item.courseId)
            items.push({
              type: 'quiz',
              label: 'Quiz completed',
              detail: course?.title || 'Course quiz',
              date: new Date(score.attemptedAt)
            })
          }
        })
      }
    })

    return items
      .sort((a, b) => b.date - a.date)
      .slice(0, 3)
  }, [courses, progress])

  React.useEffect(() => {
    const body = document.body
    body.classList.add('dashboard-route')

    return () => {
      body.classList.remove('dashboard-route')
    }
  }, [])

  if (loading) {
    return (
      <div className="page">
        <div
          style={{
            padding: 40,
            textAlign: 'center',
            fontSize: 18
          }}
        >
          ✨ {t.loading}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-page-shell">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand-wrap">
          <div className="dashboard-brand-mark">MLP</div>
          <div className="dashboard-brand-copy">
            <span>MLP</span>
            <small>Learn • Explore • Grow</small>
          </div>
        </div>

        <nav className="dashboard-sidebar-nav" aria-label="Main navigation">
          <button type="button" className="dashboard-sidebar-item active" onClick={() => handleNavigate('/dashboard')}>
            <span>🏠</span>
            <span>Dashboard</span>
          </button>
          <button type="button" className="dashboard-sidebar-item" onClick={() => handleNavigate('/explore')}>
            <span>📚</span>
            <span>My Courses</span>
          </button>
          <button type="button" className="dashboard-sidebar-item" onClick={() => handleNavigate('/explore')}>
            <span>🔎</span>
            <span>Explore</span>
          </button>
          <button type="button" className="dashboard-sidebar-item" onClick={() => handleNavigate('/notes')}>
            <span>📝</span>
            <span>Notes</span>
          </button>
        </nav>

        <div className="dashboard-sidebar-footer">
          <button type="button" className="dashboard-sidebar-item secondary" onClick={() => handleNavigate('/profile')}>
            <span>⚙️</span>
            <span>Settings</span>
          </button>
          <button type="button" className="dashboard-sidebar-item secondary" onClick={handleLogout}>
            <span>↩️</span>
            <span>Logout</span>
          </button>
        </div>

        <div className="dashboard-profile-mini" onClick={() => handleNavigate('/profile')} role="button" tabIndex={0} onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleNavigate('/profile')
          }
        }}>
          <div className="dashboard-profile-orbit" />
          <div className="dashboard-profile-meta">
            <div className="dashboard-profile-hello">Hello</div>
            <strong>{user?.name || 'Learner'}</strong>
          </div>
        </div>
      </aside>

      <main className="dashboard-surface">
        <header className="dashboard-topbar">
          <div className="dashboard-search">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search courses, lessons, or languages..."
              aria-label="Search"
            />
          </div>

          <div className="dashboard-top-actions">
            <LanguageSelector />
            <button type="button" className="dashboard-icon-button" aria-label="Notifications" onClick={() => handleNavigate('/notes')}>
              🔔
            </button>
            <div className="dashboard-profile-pill" aria-label="Profile" onClick={() => handleNavigate('/profile')} role="button" tabIndex={0} onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleNavigate('/profile')
              }
            }}>
              <span>{(user?.name || 'S')?.slice(0, 1)?.toUpperCase() || 'S'}</span>
            </div>
          </div>
        </header>

        <div className="dashboard-main-layout">
          <div className="dashboard-main-column">
            <section className="dashboard-banner">
              <div className="dashboard-banner-copy">
                <span className="dashboard-kicker">{t.learningSpace}</span>
                <h1>
                  {t.welcome}, {user?.name || 'Learner'}!
                </h1>
                <p>{t.keepLearning}</p>
              </div>

              <div className="dashboard-banner-art" aria-hidden="true">
                <div className="banner-ball" />
                <div className="banner-book banner-book-a" />
                <div className="banner-book banner-book-b" />
                <div className="banner-book banner-book-c" />
                <div className="banner-spark spark-1" />
                <div className="banner-spark spark-2" />
              </div>
            </section>

            <div className="dashboard-stats">
              <StatCard
                icon="📚"
                title={t.courses}
                value={courses.length}
                subtitle={t.available}
                gradient="linear-gradient(135deg, #f8f0ff, #f4f7ff)"
              />

              <StatCard
                icon="📈"
                title={t.yourProgress}
                value={`${overallProgress}%`}
                subtitle={`${completedLessons}/${totalLessons} ${t.lessons}`}
                gradient="linear-gradient(135deg, #edfdf6, #f3f8ff)"
              />

              <StatCard
                icon="🎯"
                title={t.quizAverage}
                value={`${averageQuiz}%`}
                subtitle={
                  quizScores.length
                    ? `${quizScores.length} ${t.attempts}`
                    : t.noQuizzes
                }
                gradient="linear-gradient(135deg, #fff4eb, #fffaf1)"
              />
            </div>

            <section className="dashboard-panel dashboard-continue-panel">
              <div className="dashboard-panel-header">
                <div>
                  <span className="dashboard-kicker">{t.continueLearning}</span>
                  <h2>{t.pickUp}</h2>
                </div>
                <button type="button" className="dashboard-panel-link" onClick={() => handleNavigate('/explore')}>
                  View All →
                </button>
              </div>

              <div className="continue-course-card">
                <div className="continue-visual">
                  {activeCourse?.title?.slice(0, 1)?.toUpperCase() || 'L'}
                </div>

                <div className="continue-copy">
                  <span className="course-pill">{activeCourse?.title || t.course}</span>
                  <h3>{activeCourse?.title || '—'}</h3>
                  <p>{activeLesson ? activeLesson.title : 'No lesson available'}</p>
                </div>

                <div className="continue-progress-meta">
                  <span>{activeCourseProgress}%</span>
                  <a
                    className="dashboard-action"
                    href={
                      activeLesson
                        ? `/lessons/${activeLesson._id}`
                        : activeCourse
                          ? `/courses/${activeCourse._id}`
                          : '#'
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      handleContinueLearning()
                    }}
                  >
                    Continue →
                  </a>
                </div>
              </div>

              <div className="continue-meta-row">
                <div className="continue-status">
                  <span className="status-label">Last active</span>
                  <strong>
                    {activeLesson ? activeLesson.title : 'No lesson available'}
                  </strong>
                </div>
                <div className="continue-status right">
                  <span className="status-label">Progress</span>
                  <strong>{activeCourseProgress}%</strong>
                </div>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${activeCourseProgress}%` }}
                />
              </div>

              <div className="continue-footer">
                <div className="continue-metric">
                  <span>{t.lessons}</span>
                  <strong>
                    {activeCourse?.lessons?.length ? `${activeLessonNumber}/${activeCourse.lessons.length}` : '0/0'}
                  </strong>
                </div>
                <div className="continue-metric">
                  <span>{t.progress}</span>
                  <strong>{activeCourseProgress}%</strong>
                </div>
              </div>
            </section>

            <section className="dashboard-explore-panel">
              <div className="dashboard-panel-header compact">
                <div>
                  <h3>{t.exploreLearn}</h3>
                  <p>{t.discover}</p>
                </div>
                <button type="button" className="dashboard-panel-link" onClick={() => handleNavigate('/explore')}>View All →</button>
              </div>

              <div className="dashboard-course-grid">
                {courses.map(course => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    onOpen={(selectedCourse) => handleNavigate(`/courses/${selectedCourse._id}`)}
                  />
                ))}
              </div>
            </section>
          </div>

          <aside className="dashboard-rail">
            <div className="dashboard-panel dashboard-rail-panel">
              <h3>Quick Actions</h3>
              <button type="button" className="quick-action-item" onClick={() => handleNavigate('/explore')}>
                <span>📘</span>
                <span>Explore Courses</span>
                <small>→</small>
              </button>
              <button type="button" className="quick-action-item" onClick={() => handleNavigate('/explore')}>
                <span>📝</span>
                <span>Take a Quiz</span>
                <small>→</small>
              </button>
              <button type="button" className="quick-action-item" onClick={() => handleNavigate('/dashboard')}>
                <span>📊</span>
                <span>View Progress</span>
                <small>→</small>
              </button>
              <button type="button" className="quick-action-item" onClick={() => handleNavigate('/notes')}>
                <span>✏️</span>
                <span>Add Note</span>
                <small>→</small>
              </button>
            </div>

            <div className="dashboard-panel dashboard-rail-panel compact-panel">
              <h3>Learning Streak</h3>
              <div className="streak-number">{streakDays} days</div>
              <p>Keep it up!</p>
              <div className="streak-row" aria-label="Weekly learning streak">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <span key={day + index} className={index < streakDays ? 'active' : ''}>{day}</span>
                ))}
              </div>
            </div>

            <div className="dashboard-panel dashboard-rail-panel activity-panel">
              <div className="panel-header-inline">
                <h3>Recent Activity</h3>
                <button type="button" className="dashboard-panel-link" onClick={() => handleNavigate('/notes')}>View All →</button>
              </div>

              <div className="activity-list">
                {recentActivity.length > 0 ? (
                  recentActivity.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="activity-item">
                      <span className={`activity-icon ${item.type}`}>
                        {item.type === 'complete' ? '✓' : item.type === 'quiz' ? '🏆' : '📘'}
                      </span>
                      <div className="activity-copy">
                        <strong>{item.label}</strong>
                        <small>{item.detail}</small>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="activity-item empty">
                    <span className="activity-icon">📖</span>
                    <div className="activity-copy">
                      <strong>No activity yet</strong>
                      <small>Start learning to see updates here.</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, title, value, subtitle, gradient }) {
  return (
    <div className="dashboard-stat-card" style={{ background: gradient }}>
      <div className="dashboard-stat-icon">{icon}</div>
      <div className="dashboard-stat-title">{title}</div>
      <div className="dashboard-stat-value">{value}</div>
      <div className="dashboard-stat-subtitle">{subtitle}</div>
    </div>
  )
}