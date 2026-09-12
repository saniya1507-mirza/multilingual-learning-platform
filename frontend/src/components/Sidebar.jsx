import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaClipboardList, FaStickyNote, FaUser } from 'react-icons/fa'

export default function Sidebar(){
  const loc = useLocation()
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
      <nav className="sidebar-nav">
        <Link to="/dashboard" className={loc.pathname.startsWith('/dashboard')? 'active':''}><FaHome/> Dashboard</Link>
        <Link to="/explore" className={loc.pathname.startsWith('/explore')? 'active':''}><FaBook/> Explore</Link>
        <Link to="/notes" className={loc.pathname.startsWith('/notes')? 'active':''}><FaStickyNote/> Notes</Link>
        <Link to="/profile" className={loc.pathname.startsWith('/profile')? 'active':''}><FaUser/> Profile</Link>
      </nav>
      <div className="sidebar-footer">© MLP</div>
    </aside>
  )
}
