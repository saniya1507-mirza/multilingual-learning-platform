import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getQuiz, submitQuiz } from '../api'

export default function Quiz(){
  const { id } = useParams()
  const nav = useNavigate()
  const [quiz,setQuiz]=useState(null)
  const [answers,setAnswers]=useState([])
  const [result,setResult]=useState(null)

  useEffect(()=>{ getQuiz(id).then(q=>{ setQuiz(q); setAnswers(new Array(q.questions.length).fill(null)) }).catch(console.error) },[id])

  function pick(i, idx){ const a=[...answers]; a[i]=idx; setAnswers(a) }

  async function submit(){ const res = await submitQuiz(id, answers); setResult(res); nav(`/quizzes/${id}/result`, { state: { res } }) }

  if (!quiz) return <div className="page">Loading...</div>

  return (
    <div className="page quiz-page">
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q,i)=> (
        <div key={q._id} className="question">
          <p className="qtext">{i+1}. {q.text}</p>
          <div className="choices">
            {q.choices.map((c,idx)=> (
              <label key={idx} className={`choice ${answers[i]===idx? 'selected':''}`}>
                <input type="radio" name={'q'+i} checked={answers[i]===idx} onChange={()=>pick(i, idx)} /> {c}
              </label>
            ))}
          </div>
        </div>
      ))}
      <div className="quiz-actions">
        <button className="btn primary" onClick={submit}>Submit</button>
      </div>
    </div>
  )
}
