import React from 'react'

export default function EmptyState({ title='Nothing here', subtitle='No items to show', children }){
  return (
    <div className="empty">
      <h3>{title}</h3>
      <p className="muted">{subtitle}</p>
      {children}
    </div>
  )
}
