import React, { useState, useEffect } from 'react'
import { me } from '../api'

export default function Profile(){
  const [user,setUser]=useState(null)
  useEffect(()=>{ me().then(setUser).catch(()=>null) },[])
  return (
    <div className="page profile-page">
      <h2>Profile</h2>
      {user? (
        <div className="profile-card">
          <div className="avatar large">{user.name?.slice(0,1)}</div>
          <div>
            <h3>{user.name}</h3>
            <p className="muted">{user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
      ) : <div>Not logged in</div>}
    </div>
  )
}
