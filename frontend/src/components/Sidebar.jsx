import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaHome, FaBook, FaStickyNote, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { logout } from '../api'

export default function Sidebar() {
  const loc = useLocation()
  const nav = useNavigate()

  function handleLogout() {
    logout()
    nav('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="profile-compact">
          <div className="avatar">ML</div>
          <div>
            <div className="name">Welcome</div>
            <div className="role">Student</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        <Link to="/dashboard" className={loc.pathname.startsWith('/dashboard') ? 'active' : ''}><FaHome /> Dashboard</Link>
        <Link to="/explore" className={loc.pathname.startsWith('/explore') ? 'active' : ''}><FaBook /> Explore</Link>
        <Link to="/notes" className={loc.pathname.startsWith('/notes') ? 'active' : ''}><FaStickyNote /> Notes</Link>
        <Link to="/profile" className={loc.pathname.startsWith('/profile') ? 'active' : ''}><FaUser /> Profile</Link>
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
        <div className="sidebar-copyright">© MLP</div>
      </div>
    </aside>
  )
}
