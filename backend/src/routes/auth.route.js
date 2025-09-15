import express from 'express';
import { checkAuth, login, logout } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middlewares/protected.middleware.js';

const router=express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/check-auth', protectedRoute, checkAuth);

export default router;