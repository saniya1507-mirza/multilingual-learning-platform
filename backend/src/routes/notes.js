const express = require('express');
const router = express.Router();
const { listNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, listNotes);
router.post('/', authMiddleware, createNote);
router.put('/:id', authMiddleware, updateNote);
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;
