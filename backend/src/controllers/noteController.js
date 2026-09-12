const Note = require('../models/Note');

async function listNotes(req, res, next) {
  const { lessonId } = req.query;
  const q = { userId: req.user._id };
  if (lessonId) q.lessonId = lessonId;
  const notes = await Note.find(q).limit(100).lean();
  res.json(notes);
}

async function createNote(req, res, next) {
  const { lessonId, text } = req.body;
  const note = new Note({ userId: req.user._id, lessonId, text });
  await note.save();
  res.json(note);
}

async function updateNote(req, res, next) {
  const note = await Note.findById(req.params.id);
  if (!note || note.userId.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Not found' });
  note.text = req.body.text;
  note.updatedAt = new Date();
  await note.save();
  res.json(note);
}

async function deleteNote(req, res, next) {
  const note = await Note.findById(req.params.id);
  if (!note || note.userId.toString() !== req.user._id.toString()) return res.status(404).json({ message: 'Not found' });
  await note.deleteOne();
  res.json({ ok: true });
}

module.exports = { listNotes, createNote, updateNote, deleteNote };
