import React, { useState } from 'react'
import { register, saveToken } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Register(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [err,setErr]=useState('')
  const nav = useNavigate()

  async function submit(e){ e.preventDefault(); setErr('')
    try{
      const res = await register({ name, email, password })
      saveToken(res.token)
      nav('/dashboard')
    }catch(e){ setErr(e.message) }
  }

  return (
    <div className="page auth">
      <div className="auth-card">
        <h2>Create account</h2>
        <form onSubmit={submit}>
          <label>Name</label>
          <input value={name} onChange={e=>setName(e.target.value)} required />
          <label>Email</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
          <label>Password</label>
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
          {err && <div className="error">{err}</div>}
          <div className="auth-actions">
            <button className="btn primary" type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}
