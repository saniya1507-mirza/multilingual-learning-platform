const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

function getToken(){
  return localStorage.getItem('token')
}

async function apiFetch(path, opts = {}){
  const headers = opts.headers || {}
  if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'
  const token = getToken()
  if (token) headers['Authorization'] = 'Bearer ' + token
  const res = await fetch(API_BASE + path, { ...opts, headers })
  const text = await res.text().catch(()=>null)
  const data = text ? JSON.parse(text) : null
  if (!res.ok) throw new Error(data?.message || 'API error')
  return data
}

export async function register(payload){ return apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(payload) }) }
export async function login(payload){ return apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(payload) }) }
export async function me(){ return apiFetch('/auth/me') }
export async function getCourses(){ return apiFetch('/courses') }
export async function getCourse(id){ return apiFetch('/courses/' + id) }
export async function getLesson(id, lang){ return apiFetch('/lessons/' + id + (lang ? '?lang='+lang : '')) }
export async function getQuiz(id){ return apiFetch('/quizzes/' + id) }
export async function submitQuiz(id, answers){ return apiFetch('/quizzes/' + id + '/submit', { method: 'POST', body: JSON.stringify({ answers }) }) }
export async function translate(payload){ return apiFetch('/translate', { method: 'POST', body: JSON.stringify(payload) }) }
export async function explain(payload){ return apiFetch('/translate/explain', { method: 'POST', body: JSON.stringify(payload) }) }

export function saveToken(token){ localStorage.setItem('token', token) }
export function logout(){ localStorage.removeItem('token') }
