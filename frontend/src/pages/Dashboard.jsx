import React from 'react'
import CourseCard from '../components/CourseCard'
import { getCourses, getProgress, me, translate } from '../api'

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
  const [user, setUser] = React.useState(null)
  const [courses, setCourses] = React.useState([])
  const [progress, setProgress] = React.useState([])
  const [lang, setLang] = React.useState(
    localStorage.getItem('mlp_lang') || 'en'
  )
  const [loading, setLoading] = React.useState(true)

  const t = UI[lang] || UI.en

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

  return (
    <div
      className="page dashboard"
      style={{
        background:
          'linear-gradient(135deg, #fff7fb 0%, #f8f5ff 50%, #fff 100%)',
        minHeight: '100vh',
        paddingBottom: 50
      }}
    >

      {/* HERO */}

      <section
        style={{
          background:
            'linear-gradient(135deg, #ec4899, #a855f7)',
          borderRadius: 28,
          padding: '32px 34px',
          color: 'white',
          marginBottom: 26,
          boxShadow:
            '0 15px 40px rgba(168, 85, 247, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >

        <div
          style={{
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            right: -50,
            top: -60
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.10)',
            right: 100,
            bottom: -50
          }}
        />

        <div style={{ position: 'relative' }}>

          <div
            style={{
              fontSize: 14,
              opacity: 0.9,
              marginBottom: 8
            }}
          >
            ✨ {t.learningSpace}
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 32,
              fontWeight: 800
            }}
          >
            {t.welcome}, {user?.name || 'Learner'}! 👋
          </h1>

          <p
            style={{
              marginTop: 10,
              marginBottom: 0,
              fontSize: 16,
              opacity: 0.92
            }}
          >
            {t.keepLearning} 💗
          </p>

        </div>
      </section>


      {/* STAT CARDS */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 16,
          marginBottom: 26
        }}
      >

        <StatCard
          icon="📚"
          title={t.courses}
          value={courses.length}
          subtitle={t.available}
          gradient="linear-gradient(135deg,#fce7f3,#fdf2f8)"
        />

        <StatCard
          icon="✅"
          title={t.completed}
          value={completedLessons}
          subtitle={`${t.lessonsOf} ${totalLessons} ${t.lessons}`}
          gradient="linear-gradient(135deg,#ede9fe,#f5f3ff)"
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
          gradient="linear-gradient(135deg,#fef3c7,#fff7ed)"
        />

        <StatCard
          icon="🔥"
          title={t.learningStreak}
          value="5"
          subtitle={t.daysRow}
          gradient="linear-gradient(135deg,#ffe4e6,#fff1f2)"
        />

      </div>


      {/* PROGRESS + PROFILE */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(0, 2fr) minmax(280px, 1fr)',
          gap: 20,
          marginBottom: 28
        }}
      >

        {/* OVERALL PROGRESS */}

        <div
          style={{
            background: 'white',
            borderRadius: 24,
            padding: 26,
            boxShadow:
              '0 8px 30px rgba(80,40,100,0.08)'
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18
            }}
          >

            <div>
              <h2 style={{ margin: 0 }}>
                {t.yourProgress} 📈
              </h2>

              <p
                style={{
                  margin: '6px 0 0',
                  color: '#777'
                }}
              >
                {t.keepMoving}
              </p>
            </div>

            <div
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#ec4899'
              }}
            >
              {overallProgress}%
            </div>

          </div>

          <div
            style={{
              height: 16,
              background: '#f3e8ff',
              borderRadius: 20,
              overflow: 'hidden',
              marginBottom: 24
            }}
          >
            <div
              style={{
                width: `${overallProgress}%`,
                height: '100%',
                borderRadius: 20,
                background:
                  'linear-gradient(90deg,#ec4899,#a855f7)',
                transition: 'width .5s ease'
              }}
            />
          </div>

          <h3 style={{ marginBottom: 16 }}>
            {t.courseProgress}
          </h3>

          {courses.length === 0 ? (
            <p className="muted">
              {t.noCourses}
            </p>
          ) : (
            courses.slice(0, 5).map(course => {

              const percent =
                getCourseProgress(course)

              return (
                <div
                  key={course._id}
                  style={{
                    marginBottom: 17
                  }}
                >

                  <div
                    style={{
                      display: 'flex',
                      justifyContent:
                        'space-between',
                      marginBottom: 7,
                      fontSize: 14,
                      fontWeight: 600
                    }}
                  >

                    <span>
                      {course.title}
                    </span>

                    <span
                      style={{
                        color: '#ec4899'
                      }}
                    >
                      {percent}%
                    </span>

                  </div>

                  <div
                    style={{
                      height: 9,
                      background: '#f3f4f6',
                      borderRadius: 10,
                      overflow: 'hidden'
                    }}
                  >

                    <div
                      style={{
                        width: `${percent}%`,
                        height: '100%',
                        borderRadius: 10,
                        background:
                          'linear-gradient(90deg,#f472b6,#8b5cf6)'
                      }}
                    />

                  </div>

                </div>
              )
            })
          )}

        </div>


        {/* PROFILE */}

        <div
          style={{
            background:
              'linear-gradient(160deg,#fff1f7,#f5f3ff)',
            borderRadius: 24,
            padding: 26,
            boxShadow:
              '0 8px 30px rgba(80,40,100,0.08)'
          }}
        >

          <div
            style={{
              fontSize: 14,
              color: '#a855f7',
              fontWeight: 700,
              marginBottom: 18
            }}
          >
            {t.myProfile}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14
            }}
          >

            <div
              style={{
                width: 65,
                height: 65,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg,#ec4899,#8b5cf6)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                fontWeight: 800,
                boxShadow:
                  '0 8px 20px rgba(236,72,153,.25)'
              }}
            >
              {user?.name?.slice(0, 1)?.toUpperCase() || 'L'}
            </div>

            <div>

              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800
                }}
              >
                {user?.name || 'Learner'}
              </div>

              <div
                style={{
                  color: '#777',
                  fontSize: 13,
                  marginTop: 4
                }}
              >
                {user?.email}
              </div>

            </div>

          </div>

          <div
            style={{
              marginTop: 26,
              padding: 16,
              background: 'rgba(255,255,255,.75)',
              borderRadius: 18
            }}
          >

            <div
              style={{
                fontSize: 13,
                color: '#777'
              }}
            >
              {t.learningLanguage}
            </div>

            <div
              style={{
                marginTop: 5,
                fontSize: 18,
                fontWeight: 800,
                color: '#ec4899'
              }}
            >
              🌐 {lang.toUpperCase()}
            </div>

          </div>

        </div>

      </div>


      {/* CONTINUE LEARNING */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15
        }}
      >

        <div>

          <h2 style={{ margin: 0 }}>
            {t.continueLearning} 🚀
          </h2>

          <p
            style={{
              margin: '5px 0 0',
              color: '#777'
            }}
          >
            {t.pickUp}
          </p>

        </div>

      </div>


      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 18,
          marginBottom: 32
        }}
      >

        {courses.slice(0, 2).map(course => {

          const percent =
            getCourseProgress(course)

          return (
            <div
              key={course._id}
              style={{
                background: 'white',
                borderRadius: 24,
                padding: 22,
                boxShadow:
                  '0 8px 30px rgba(80,40,100,0.08)',
                border:
                  '1px solid rgba(236,72,153,.08)'
              }}
            >

              <div
                style={{
                  fontSize: 13,
                  color: '#ec4899',
                  fontWeight: 700
                }}
              >
                📖 {t.course}
              </div>

              <h3 style={{ margin: '8px 0' }}>
                {course.title}
              </h3>

              <p
                style={{
                  color: '#777',
                  fontSize: 14,
                  lineHeight: 1.5
                }}
              >
                {course.descriptionOriginal}
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: 15,
                  marginBottom: 7,
                  fontSize: 13
                }}
              >
                <span>{t.progress}</span>
                <strong>{percent}%</strong>
              </div>

              <div
                style={{
                  height: 9,
                  background: '#f3f4f6',
                  borderRadius: 10,
                  overflow: 'hidden'
                }}
              >

                <div
                  style={{
                    width: `${percent}%`,
                    height: '100%',
                    background:
                      'linear-gradient(90deg,#ec4899,#a855f7)',
                    borderRadius: 10
                  }}
                />

              </div>

              <a
                href={`/courses/${course._id}`}
                style={{
                  display: 'inline-block',
                  marginTop: 18,
                  padding: '11px 20px',
                  borderRadius: 14,
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 700,
                  background:
                    'linear-gradient(135deg,#ec4899,#a855f7)',
                  boxShadow:
                    '0 6px 15px rgba(168,85,247,.2)'
                }}
              >
                {t.continueLearning} →
              </a>

            </div>
          )
        })}

      </div>


      {/* EXPLORE */}

      <div style={{ marginBottom: 15 }}>

        <h2 style={{ margin: 0 }}>
          {t.exploreLearn} 💡
        </h2>

        <p
          style={{
            margin: '5px 0 0',
            color: '#777'
          }}
        >
          {t.discover}
        </p>

      </div>

      <div className="grid">

        {courses.map(course => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}

      </div>

    </div>
  )
}

function StatCard({ icon, title, value, subtitle }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 20,
        padding: 22,
        boxShadow: '0 8px 25px rgba(120,80,150,.08)',
        border: '1px solid #f1e5f5'
      }}
    >
      <div style={{ fontSize: 28 }}>
        {icon}
      </div>

      <div
        style={{
          fontSize: 14,
          color: '#777',
          marginTop: 8
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: '#8e44ad',
          marginTop: 4
        }}
      >
        {value}
      </div>

      <div
        style={{
          fontSize: 13,
          color: '#999',
          marginTop: 4
        }}
      >
        {subtitle}
      </div>
    </div>
  )
}