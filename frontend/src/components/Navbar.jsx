import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LanguageSelector from './LanguageSelector'
import { logout } from '../api'
import { FaGlobe } from 'react-icons/fa'

export default function Navbar(){
  const nav = useNavigate()
  function handleLogout(){ logout(); nav('/login') }
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">MLP</Link>
        <nav className="nav-links">
          <Link to="/explore">Explore</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/notes">Notes</Link>
        </nav>
      </div>
      <div className="nav-right">
        <LanguageSelector />
        <button className="btn small ghost" onClick={()=>nav('/login')}>Login</button>
      </div>
    </header>
  )
}
