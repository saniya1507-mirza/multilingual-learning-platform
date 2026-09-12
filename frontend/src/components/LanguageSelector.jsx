import React, { useState, useEffect, useRef } from 'react'

// Comprehensive language list (name + BCP-47 / ISO 639 code)
const LANGS = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'te', name: 'Telugu' },
  { code: 'ur', name: 'Urdu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'or', name: 'Odia' },
  { code: 'as', name: 'Assamese' },
  { code: 'ne', name: 'Nepali' },
  { code: 'ar', name: 'Arabic' },
  { code: 'fa', name: 'Persian' },
  { code: 'zh', name: 'Chinese (Mandarin)' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'id', name: 'Indonesian' },
  { code: 'ms', name: 'Malay' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'th', name: 'Thai' },
  { code: 'sw', name: 'Swahili' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'el', name: 'Greek' },
  { code: 'he', name: 'Hebrew' },
  { code: 'sv', name: 'Swedish' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'ro', name: 'Romanian' },
  { code: 'cs', name: 'Czech' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'sr', name: 'Serbian' },
  { code: 'hr', name: 'Croatian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'et', name: 'Estonian' },
  { code: 'fil', name: 'Filipino' },
  { code: 'ceb', name: 'Cebuano' },
  { code: 'my', name: 'Burmese' },
  { code: 'km', name: 'Khmer' },
  { code: 'lo', name: 'Lao' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'az', name: 'Azerbaijani' },
  { code: 'hy', name: 'Armenian' },
  { code: 'ka', name: 'Georgian' },
  { code: 'si', name: 'Sinhala' },
  { code: 'so', name: 'Somali' },
  { code: 'ha', name: 'Hausa' },
  { code: 'yo', name: 'Yoruba' },
  { code: 'zu', name: 'Zulu' },
  { code: 'am', name: 'Amharic' },
  { code: 'ku', name: 'Kurdish' },
  { code: 'ps', name: 'Pashto' },
  { code: 'ca', name: 'Catalan' },
  { code: 'gl', name: 'Galician' },
  { code: 'eu', name: 'Basque' },
  { code: 'ga', name: 'Irish' },
  { code: 'cy', name: 'Welsh' },
  { code: 'mt', name: 'Maltese' },
  { code: 'is', name: 'Icelandic' },
  { code: 'sq', name: 'Albanian' },
  { code: 'mk', name: 'Macedonian' },
  { code: 'bs', name: 'Bosnian' },
  { code: 'be', name: 'Belarusian' },
  { code: 'bo', name: 'Tibetan' },
  { code: 'sd', name: 'Sindhi' },
  { code: 'mi', name: 'Maori' },
  { code: 'ht', name: 'Haitian Creole' },
  { code: 'lb', name: 'Luxembourgish' },
  { code: 'mg', name: 'Malagasy' },
  { code: 'rw', name: 'Kinyarwanda' },
  { code: 'ny', name: 'Nyanja' },
  { code: 'tl', name: 'Tagalog' }
]

export default function LanguageSelector(){
  const defaultLang = localStorage.getItem('mlp_lang') || 'en'
  const [selected, setSelected] = useState(defaultLang)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const ref = useRef()

  useEffect(()=>{
    function onClick(e){ if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    window.addEventListener('click', onClick)
    return ()=> window.removeEventListener('click', onClick)
  },[])

  useEffect(()=>{
    // ensure default saved
    localStorage.setItem('mlp_lang', selected)
  },[selected])

  function selectLang(code){
    setSelected(code)
    localStorage.setItem('mlp_lang', code)
    // dispatch global event so other components can react
    window.dispatchEvent(new CustomEvent('mlp:lang', { detail: code }))
    setOpen(false)
  }

  const filtered = LANGS.filter(l=> l.name.toLowerCase().includes(query.toLowerCase()) || l.code.toLowerCase().includes(query.toLowerCase()))

  const currentName = LANGS.find(l=>l.code===selected)?.name || selected

  return (
    <div className="lang-select" ref={ref}>
      <button className="btn ghost" onClick={()=> setOpen(o=>!o)} aria-haspopup="listbox" aria-expanded={open}>
        {currentName}
      </button>

      {open && (
        <div className="lang-dropdown" role="dialog">
          <input className="lang-search" placeholder="Search language..." value={query} onChange={e=>setQuery(e.target.value)} autoFocus />
          <ul className="lang-list" role="listbox">
            {filtered.map(l=> (
              <li key={l.code} onClick={()=>selectLang(l.code)} className={l.code===selected? 'active':''} role="option">
                <div className="lang-name">{l.name}</div>
                <div className="lang-code">{l.code}</div>
              </li>
            ))}
            {filtered.length===0 && <li className="empty">No languages found</li>}
          </ul>
        </div>
      )}
    </div>
  )
}
