import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export default function Landing(){
  return (
    <div className="page home">
      <section className="hero">
        <div className="hero-left">
          <h1>Learn anything, in the language you understand</h1>
          <p className="lead">A global AI-powered learning platform that removes language barriers. Translate lessons, get simple explanations, and track your progress — all in your preferred language.</p>
          <div className="cta">
            <Link to="/register" className="btn primary">Get Started</Link>
            <Link to="/explore" className="btn ghost">Explore Courses</Link>
          </div>
          <div className="features">
            <div className="feature">
              <h4>Multilingual Content</h4>
              <p>Switch languages instantly without losing progress.</p>
            </div>
            <div className="feature">
              <h4>Explain Simply</h4>
              <p>Get AI-powered simple explanations for difficult concepts.</p>
            </div>
            <div className="feature">
              <h4>Progress Tracking</h4>
              <p>Personalized dashboard and learning statistics.</p>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="card showcase">
            <h3>Popular courses</h3>
            <ul>
              <li>Intro to Biology</li>
              <li>Basic Algebra</li>
              <li>World History</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="languages">
        <h3>Available Languages</h3>
        <div className="lang-grid">
          <div className="lang">English</div>
          <div className="lang">Hindi</div>
          <div className="lang">Telugu</div>
          <div className="lang">Urdu</div>
          <div className="lang">Tamil</div>
        </div>
      </section>
    </div>
  )
}
