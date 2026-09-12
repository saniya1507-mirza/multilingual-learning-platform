// Mock API for frontend demo-only. Does not call backend.
const MOCK_DELAY = 300

const mockDB = {
  users: [
    { id: 'u1', name: 'Demo Student', email: 'student@example.com', password: 'pass123', role: 'student', preferredLanguage: 'en' },
    { id: 't1', name: 'Demo Teacher', email: 'teacher@example.com', password: 'teach123', role: 'teacher', preferredLanguage: 'en' }
  ],
  courses: [
    {
      _id: 'c1',
      title: 'Intro to Biology',
      descriptionOriginal: 'A beginner-friendly biology course.',
      languageOriginal: 'en',
      lessons: [
        { _id: 'l1', title: 'Cells and Organelles', contentOriginal: 'Cells are the basic unit of life. This lesson covers cell structure and organelles.', order: 1 },
        { _id: 'l2', title: 'Photosynthesis', contentOriginal: 'Photosynthesis converts light into chemical energy. This lesson explains the process step by step.', order: 2 }
      ]
    },
    {
      _id: 'c2',
      title: 'Basic Algebra',
      descriptionOriginal: 'Understand variables, equations, and simple functions.',
      languageOriginal: 'en',
      lessons: [
        { _id: 'l3', title: 'Variables and Expressions', contentOriginal: 'Learn what variables are and how to write expressions.', order: 1 },
        { _id: 'l4', title: 'Solving Equations', contentOriginal: 'Methods to solve linear equations and check solutions.', order: 2 }
      ]
    }
  ],
  quizzes: [
    { _id: 'q1', lessonId: 'l1', title: 'Cells Quiz', questions: [ { _id: 'q1a', text: 'What is the basic unit of life?', choices: ['Atom','Molecule','Cell','Organ'], correctAnswer: 2, explanation: 'Cells are the basic unit of life.' } ] }
  ],
  notes: [
    { id: 'n1', userId: 'u1', lessonId: 'l1', text: 'Remember mitochondria produce energy.' }
  ],
  progress: [
    { userId: 'u1', courseId: 'c1', lessonId: 'l1', completed: true, lastViewedAt: new Date().toISOString(), quizScores: [ { quizId: 'q1', score: 100, attemptedAt: new Date().toISOString() } ] }
  ]
}

function delay(result){
  return new Promise((res)=> setTimeout(()=>res(result), MOCK_DELAY))
}

function makeTokenFor(user){
  // simple mock token
  return 'mock-token-' + user.id
}

function getUserFromToken(token){
  if (!token) return null
  const id = token.replace('mock-token-','')
  return mockDB.users.find(u=>u.id === id) || null
}

export async function register({ name, email, password }){
  const existing = mockDB.users.find(u=>u.email===email)
  if (existing) throw new Error('Email already exists (mock)')
  const id = 'u' + (mockDB.users.length + 1)
  const user = { id, name, email, password, role: 'student', preferredLanguage: 'en' }
  mockDB.users.push(user)
  const token = makeTokenFor(user)
  return delay({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage } })
}

export async function login({ email, password }){
  const user = mockDB.users.find(u=>u.email===email && u.password===password)
  if (!user) throw new Error('Invalid credentials (mock)')
  const token = makeTokenFor(user)
  return delay({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role, preferredLanguage: user.preferredLanguage } })
}

export async function me(){
  const header = localStorage.getItem('mock_token') || localStorage.getItem('token')
  const user = getUserFromToken(header)
  if (!user) return delay(null)
  const { password, ...u } = user
  return delay(u)
}

export async function getCourses(){
  return delay(mockDB.courses.map(c=> ({ ...c })))
}

export async function getCourse(id){
  const c = mockDB.courses.find(x=>x._id===id)
  return delay(c ? { ...c } : null)
}

export async function getLesson(id, lang){
  let found = null
  for (const c of mockDB.courses){
    const l = c.lessons.find(x=>x._id===id)
    if (l){ found = { ...l, courseId: c._id }; break }
  }
  if (!found) return delay(null)
  // simulate translation present if lang != en
  if (lang && lang !== 'en'){
    const translated = `[${lang.toUpperCase()} TRANSLATION]\n` + found.contentOriginal
    return delay({ ...found, content: translated, lang })
  }
  return delay({ ...found, content: found.contentOriginal, lang: 'en' })
}

export async function getQuiz(id){
  const q = mockDB.quizzes.find(x=>x._id===id)
  return delay(q ? { ...q } : null)
}

export async function submitQuiz(id, answers){
  const quiz = mockDB.quizzes.find(x=>x._id===id)
  if (!quiz) throw new Error('Quiz not found (mock)')
  let correct = 0
  quiz.questions.forEach((q,i)=>{ if (answers[i] === q.correctAnswer) correct++ })
  const score = Math.round((correct / quiz.questions.length) * 100)
  return delay({ score, correct, total: quiz.questions.length })
}

export async function translate({ sourceType, sourceId, text, targetLang }){
  const translatedText = `[${targetLang.toUpperCase()} TRANSLATION]\n` + (text||'')
  return delay({ translatedText, cached: false })
}

export async function explain({ text, targetLang, style }){
  const explanation = `Simple explanation (${targetLang||'en'}): ${text.split('.').slice(0,2).join('.')}...`
  return delay({ explanation })
}

export async function getNotes(){
  const token = localStorage.getItem('mock_token') || localStorage.getItem('token')
  const user = getUserFromToken(token)
  if (!user) return delay([])
  const notes = mockDB.notes.filter(n=>n.userId===user.id).map(n=>({ ...n }))
  return delay(notes)
}

export async function createNote({ lessonId, text }){
  const token = localStorage.getItem('mock_token') || localStorage.getItem('token')
  const user = getUserFromToken(token)
  if (!user) throw new Error('Not authenticated (mock)')
  const id = 'n' + (mockDB.notes.length + 1)
  const note = { id, userId: user.id, lessonId, text }
  mockDB.notes.unshift(note)
  return delay(note)
}

export async function updateNote(id, { text }){
  const note = mockDB.notes.find(n=>n.id===id)
  if (!note) throw new Error('Note not found (mock)')
  note.text = text
  return delay(note)
}

export async function deleteNote(id){
  const idx = mockDB.notes.findIndex(n=>n.id===id)
  if (idx === -1) throw new Error('Not found')
  mockDB.notes.splice(idx,1)
  return delay({ ok: true })
}

export function saveToken(token){
  // save as mock_token for me() detection
  localStorage.setItem('mock_token', token)
}

export function logout(){
  localStorage.removeItem('mock_token')
}
