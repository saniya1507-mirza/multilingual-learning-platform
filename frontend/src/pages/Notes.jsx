import React, { useEffect, useState } from 'react'
import { getNotes, createNote, updateNote, deleteNote } from '../api'

export default function Notes(){
  const [notes,setNotes]=useState([])
  const [text,setText]=useState('')
  const [editing,setEditing]=useState(null)

  useEffect(()=>{ fetchNotes() },[])
  async function fetchNotes(){ try{ const res = await getNotes(); setNotes(res) }catch(e){ console.error(e) } }

  async function add(){ if(!text) return; const n = await createNote({ lessonId: null, text }); setNotes(prev=>[n, ...prev]); setText('') }
  async function saveEdit(){ if(!editing) return; const u = await updateNote(editing.id, { text: editing.text }); setNotes(prev=> prev.map(p=> p.id===u.id? u : p)); setEditing(null) }
  async function remove(id){ await deleteNote(id); setNotes(prev=> prev.filter(p=> p.id !== id)) }

  return (
    <div className="page notes-page">
      <h2>My Notes</h2>
      <div className="note-editor card">
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write a quick note" />
        <div style={{display:'flex', gap:8}}>
          <button className="btn primary" onClick={add}>Save Note</button>
          {editing && <button className="btn" onClick={saveEdit}>Save Edit</button>}
        </div>
      </div>

      <div className="notes-grid" style={{marginTop:12}}>
        {notes.length===0? <div className="empty">No notes yet</div> : notes.map(n=> (
          <div className="note-card card" key={n.id}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>{n.text}</div>
              <div>
                <button className="btn ghost" onClick={()=>{ setEditing(n); setText(n.text) }}>Edit</button>
                <button className="btn ghost" onClick={()=>remove(n.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
