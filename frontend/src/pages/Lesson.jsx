import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLesson, translate, explain } from '../api'

const LANGS = ['en','hi','te','ur','ta']

export default function Lesson(){
  const { id } = useParams()
  const [lang,setLang]=useState(localStorage.getItem('mlp_lang')||'en')
  const [lesson,setLesson]=useState(null)
  const [loading,setLoading]=useState(true)
  const [explainText,setExplainText]=useState('')

  useEffect(()=>{ load() },[id,lang])
  async function load(){ setLoading(true); try{ const data = await getLesson(id, lang); setLesson(data); }catch(e){ console.error(e) } finally{ setLoading(false) } }

  async function handleExplain(){ if(!lesson) return; const res = await explain({ text: lesson.content, targetLang: lang, style: 'simple' }); setExplainText(res.explanation) }
  async function handleTranslate(){ if(!lesson) return; await translate({ sourceType: 'lesson', sourceId: id, text: lesson.content, targetLang: lang }); load() }

  if (loading) return <div className="page">Loading...</div>
  if (!lesson) return <div className="page">No lesson found</div>

  return (
    <div className="page lesson-page">
      <div className="lesson-head">
        <h2>{lesson.title}</h2>
        <div className="lesson-controls">
          <select value={lang} onChange={e=>{ setLang(e.target.value); localStorage.setItem('mlp_lang', e.target.value) }}>
            {LANGS.map(l=> <option key={l} value={l}>{l}</option>)}
          </select>
          <button className="btn" onClick={handleTranslate}>Translate</button>
          <button className="btn" onClick={handleExplain}>Explain Simply</button>
        </div>
      </div>

      <div className="lesson-body">
        <pre>{lesson.content}</pre>
      </div>

      {explainText && (
        <div className="card explain">
          <h4>Simple Explanation</h4>
          <p>{explainText}</p>
        </div>
      )}

      <div className="lesson-footer">
        <Link to="/explore" className="btn ghost">Back to courses</Link>
      </div>
    </div>
  )
}
