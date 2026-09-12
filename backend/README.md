# MLP Backend

Run:
1. cp .env.example .env and set MONGODB_URI and JWT_SECRET
2. npm install
3. npm run dev

APIs:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/courses
- GET /api/courses/:id
- GET /api/lessons/:id?lang=xx
- POST /api/translate
- POST /api/translate/explain
- GET /api/quizzes/:id
- POST /api/quizzes/:id/submit
- GET/POST /api/progress
- GET/POST/PUT/DELETE /api/notes
