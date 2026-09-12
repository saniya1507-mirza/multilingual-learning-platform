import React from 'react'

export default function LanguageSelector(){
  const langs = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'te', label: 'Telugu' },
    { code: 'ur', label: 'Urdu' },
    { code: 'ta', label: 'Tamil' }
  ]
  const [lang, setLang] = React.useState(localStorage.getItem('mlp_lang') || 'en')
  function change(e){ setLang(e.target.value); localStorage.setItem('mlp_lang', e.target.value) }
  return (
    <select className="select-lang" value={lang} onChange={change} aria-label="Language selector">
      {langs.map(l=> <option key={l.code} value={l.code}>{l.label}</option>)}
    </select>
  )
}
