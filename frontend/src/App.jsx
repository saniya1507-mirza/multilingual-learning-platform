import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import Course from './pages/Course'
import Lesson from './pages/Lesson'
import Quiz from './pages/Quiz'
import QuizResult from './pages/QuizResult'
import Notes from './pages/Notes'
import Profile from './pages/Profile'

export default function App(){
  return (
    <div className="app">
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/courses/:id" element={<Course />} />
            <Route path="/lessons/:id" element={<Lesson />} />
            <Route path="/quizzes/:id" element={<Quiz />} />
            <Route path="/quizzes/:id/result" element={<QuizResult />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </main>
      </div>
    </div>
  )
}
