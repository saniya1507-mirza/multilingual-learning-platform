const API_BASE_URL = 'https://multilingual-learning-platform.onrender.com'

async function request(path, options = {}) {
  const token = localStorage.getItem('token')
  const headers = { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers }
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers })
  const data = await response.json().catch(() => null)
  if (!response.ok) throw new Error(data?.message || 'Request failed')
  return data
}

const json = body => ({ method: 'POST', body: JSON.stringify(body) })

export function register(body) { return request('/auth/register', json(body)) }
export function login(body) { return request('/auth/login', json(body)) }
export function me() { return request('/auth/me') }
export function getCourses() { return request('/courses') }
export function getCourse(id) { return request(`/courses/${id}`) }
export function getLesson(id, lang) { return request(`/lessons/${id}${lang ? `?lang=${encodeURIComponent(lang)}` : ''}`) }
export function getQuiz(id) { return request(`/quizzes/${id}`) }
export function submitQuiz(id, answers) { return request(`/quizzes/${id}/submit`, json({ answers })) }
export function getProgress() { return request('/progress') }
export function postProgress(body) { return request('/progress', json(body)) }
export function translate(body) { return request('/translate', json(body)) }
export function explain(body) { return request('/translate/explain', json(body)) }
export function getNotes() {
  return request('/notes').then(notes => notes.map(note => ({ ...note, id: note.id || note._id })))
}
export function createNote(body) {
  return request('/notes', json(body)).then(note => ({ ...note, id: note.id || note._id }))
}
export function updateNote(id, body) {
  return request(`/notes/${id}`, { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } })
    .then(note => ({ ...note, id: note.id || note._id }))
}
export function deleteNote(id) { return request(`/notes/${id}`, { method: 'DELETE' }) }

export function saveToken(token) { localStorage.setItem('token', token) }
export function logout() { localStorage.removeItem('token') }
