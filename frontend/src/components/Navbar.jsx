import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageSelector from './LanguageSelector'
import { logout } from '../api'

export default function Navbar() {
  const nav = useNavigate()

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

  const text = {
    en: {
      explore: 'Explore',
      dashboard: 'Dashboard',
      notes: 'Notes',
      login: 'Login'
    },

    hi: {
      explore: 'पाठ्यक्रम',
      dashboard: 'डैशबोर्ड',
      notes: 'नोट्स',
      login: 'लॉगिन'
    },

    ur: {
      explore: 'کورسز',
      dashboard: 'ڈیش بورڈ',
      notes: 'نوٹس',
      login: 'لاگ ان'
    },

    te: {
      explore: 'కోర్సులు',
      dashboard: 'డ్యాష్‌బోర్డ్',
      notes: 'నోట్స్',
      login: 'లాగిన్'
    }
  }

  const currentText = text[lang] || text.en

  function handleLogout() {
    logout()
    nav('/login')
  }

  return (
    <header className="navbar">

      <div className="nav-left">

        <Link to="/" className="brand">
          MLP
        </Link>

        <nav className="nav-links">

          <Link to="/explore">
            {currentText.explore}
          </Link>

          <Link to="/dashboard">
            {currentText.dashboard}
          </Link>

          <Link to="/notes">
            {currentText.notes}
          </Link>

        </nav>

      </div>

      <div className="nav-right">

        <LanguageSelector />

        <button
          className="btn small ghost"
          onClick={() => nav('/login')}
        >
          {currentText.login}
        </button>

      </div>

    </header>
  )
}