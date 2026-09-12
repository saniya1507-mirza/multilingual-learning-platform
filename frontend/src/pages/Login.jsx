import React, { useState } from 'react'
import { login, saveToken } from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const [show,setShow]=useState(false)
  const nav = useNavigate()

  async function submit(e){ e.preventDefault(); setErr('');
    try{
      const res = await login({ email, password })
      saveToken(res.token)
      nav('/dashboard')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="page auth">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={submit}>
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <div className="password-field">
            <input value={password} onChange={e=>setPassword(e.target.value)} type={show? 'text':'password'} required />
            <button type="button" className="btn ghost" onClick={()=>setShow(s=>!s)}>{show? 'Hide':'Show'}</button>
          </div>
          {err && <div className="error">{err}</div>}
          <div className="auth-actions">
            <button className="btn primary" type="submit">Login</button>
            <Link to="/register" className="btn ghost">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
