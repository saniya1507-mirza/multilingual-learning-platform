import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export default function QuizResult(){
  const loc = useLocation()
  const res = loc.state?.res
  if (!res) return <div className="page">No result</div>
  return (
    <div className="page quiz-result">
      <div className="card result">
        <h2>Score: {res.score}%</h2>
        <p>{res.correct}/{res.total} correct</p>
        <div className="actions">
          <Link to="/dashboard" className="btn">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
