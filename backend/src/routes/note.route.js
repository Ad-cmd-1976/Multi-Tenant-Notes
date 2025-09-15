import express from 'express';
import { getAllNotes, createNote, deleteNote, updateNote } from '../controllers/note.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';

const router=express.Router();

router.post('/', protectedRoute, getAllNotes);
router.post('/create', protectedRoute, createNote);
router.delete('/delete/:id', protectedRoute, deleteNote);
router.patch('/update', protectedRoute, updateNote);

export default router;