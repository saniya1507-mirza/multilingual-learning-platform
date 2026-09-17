import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCourse } from '../api'

const translations = {
  hi: {
    'MLP Demo: Everyday English': {
      title: 'एमएलपी डेमो: रोज़मर्रा की अंग्रेज़ी',
      description:
        'रोज़मर्रा की परिस्थितियों के लिए उपयोगी अंग्रेज़ी शब्दावली और बातचीत के कौशल विकसित करें।',
      lessons: {
        'Greetings and Introductions': 'अभिवादन और परिचय',
        'Daily Routines': 'दैनिक दिनचर्या'
      }
    },

    'MLP Demo: Foundations of Biology': {
      title: 'एमएलपी डेमो: जीव विज्ञान की मूल बातें',
      description:
        'कोशिकाओं, जीवों और खाद्य श्रृंखलाओं सहित जीव विज्ञान की मूल बातें सीखें।',
      lessons: {
        'Cells and Organelles': 'कोशिकाएँ और कोशिकांग',
        'Food Chains': 'खाद्य श्रृंखलाएँ'
      }
    },

    'MLP Demo: Practical Mathematics': {
      title: 'एमएलपी डेमो: व्यावहारिक गणित',
      description:
        'चर, व्यंजक और सरल समीकरणों की मूल बातें सीखें।',
      lessons: {
        'Variables and Expressions': 'चर और व्यंजक',
        'Solving Simple Equations': 'सरल समीकरणों को हल करना'
      }
    }
  },

  ur: {
    'MLP Demo: Everyday English': {
      title: 'ایم ایل پی ڈیمو: روزمرہ کی انگریزی',
      description:
        'روزمرہ کی صورتحال کے لیے مفید انگریزی الفاظ اور گفتگو کی مہارتیں سیکھیں۔',
      lessons: {
        'Greetings and Introductions': 'سلام اور تعارف',
        'Daily Routines': 'روزمرہ کے معمولات'
      }
    },

    'MLP Demo: Foundations of Biology': {
      title: 'ایم ایل پی ڈیمو: حیاتیات کی بنیادی باتیں',
      description:
        'خلیات، عضیات اور غذائی زنجیروں سمیت حیاتیات کی بنیادی باتیں سیکھیں۔',
      lessons: {
        'Cells and Organelles': 'خلیات اور عضیات',
        'Food Chains': 'غذائی زنجیریں'
      }
    },

    'MLP Demo: Practical Mathematics': {
      title: 'ایم ایل پی ڈیمو: عملی ریاضی',
      description:
        'متغیرات، الجبری اظہارات اور سادہ مساوات کی بنیادی باتیں سیکھیں۔',
      lessons: {
        'Variables and Expressions': 'متغیرات اور اظہارات',
        'Solving Simple Equations': 'سادہ مساوات حل کرنا'
      }
    }
  },

  te: {
    'MLP Demo: Everyday English': {
      title: 'ఎంఎల్‌పి డెమో: రోజువారీ ఇంగ్లీష్',
      description:
        'రోజువారీ పరిస్థితులకు ఉపయోగపడే ఇంగ్లీష్ పదజాలం మరియు సంభాషణ నైపుణ్యాలను అభివృద్ధి చేసుకోండి.',
      lessons: {
        'Greetings and Introductions': 'అభివాదాలు మరియు పరిచయాలు',
        'Daily Routines': 'రోజువారీ పనులు'
      }
    },

    'MLP Demo: Foundations of Biology': {
      title: 'ఎంఎల్‌పి డెమో: జీవశాస్త్రం యొక్క ప్రాథమిక అంశాలు',
      description:
        'కణాలు, కణాంగాలు మరియు ఆహార గొలుసులతో సహా జీవశాస్త్రం యొక్క ప్రాథమిక అంశాలను నేర్చుకోండి.',
      lessons: {
        'Cells and Organelles': 'కణాలు మరియు కణాంగాలు',
        'Food Chains': 'ఆహార గొలుసులు'
      }
    },

    'MLP Demo: Practical Mathematics': {
      title: 'ఎంఎల్‌పి డెమో: ఆచరణాత్మక గణితం',
      description:
        'చరరాశులు, బీజగణిత వ్యక్తీకరణలు మరియు సరళ సమీకరణాల ప్రాథమిక అంశాలను నేర్చుకోండి.',
      lessons: {
        'Variables and Expressions': 'చరరాశులు మరియు వ్యక్తీకరణలు',
        'Solving Simple Equations': 'సరళ సమీకరణాలను పరిష్కరించడం'
      }
    }
  }
}

const uiText = {
  en: {
    lessons: 'Lessons',
    language: 'Language',
    lessonsCount: 'Lessons'
  },
  hi: {
    lessons: 'पाठ',
    language: 'भाषा',
    lessonsCount: 'पाठ'
  },
  ur: {
    lessons: 'اسباق',
    language: 'زبان',
    lessonsCount: 'اسباق'
  },
  te: {
    lessons: 'పాఠాలు',
    language: 'భాష',
    lessonsCount: 'పాఠాలు'
  }
}

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
      setCourse(null)

      const data = await getCourse(id)

      const languageData = translations[lang]?.[data.title]

      const translatedLessons = (data.lessons || []).map((lesson) => {
        const translatedTitle =
          languageData?.lessons?.[lesson.title] || lesson.title

        return {
          ...lesson,
          title: translatedTitle
        }
      })

      setCourse({
        ...data,
        title: languageData?.title || data.title,
        descriptionOriginal:
          languageData?.description ||
          data.descriptionOriginal ||
          data.description ||
          '',
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

  const text = uiText[lang] || uiText.en

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
              {text.language}: {course.languageOriginal}
            </span>

            <span>
              {text.lessonsCount}: {course.lessons?.length || 0}
            </span>
          </div>

        </div>
      </div>

      <div className="lessons">

        <h3>{text.lessons}</h3>

        <ul>
          {course.lessons?.map((lesson) => (
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