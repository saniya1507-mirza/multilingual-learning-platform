import React, { useEffect, useState } from 'react'
import { apiFetch } from '../api'
import { getCourses } from '../api'

export default function Notes(){
  const [notes,setNotes]=useState([])
  const [text,setText]=useState('')

  useEffect(()=>{ fetchNotes() },[])
  async function fetchNotes(){ try{ const res = await fetch('/api/notes') }catch(e){} }

  function add(){ setNotes([{ id: Date.now(), text }, ...notes]); setText('') }

  return (
    <div className="page notes-page">
      <h2>My Notes</h2>
      <div className="note-editor">
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write a quick note" />
        <button className="btn primary" onClick={add}>Save Note</button>
      </div>
      <div className="notes-grid">
        {notes.length===0? <div className="empty">No notes yet</div> : notes.map(n=> (
          <div className="note-card" key={n.id}>
            <p>{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
