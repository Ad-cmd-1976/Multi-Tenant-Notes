import express from 'express';
import { protectedRoute, adminRoute } from '../middlewares/protected.middleware.js';
import { getAllUsers, deleteUser, addUser } from '../controllers/admin.controller.js';

const router=express();

router.get('/users', protectedRoute, adminRoute, getAllUsers);
router.post('/add-user', protectedRoute, adminRoute, addUser);
router.delete('/delete/:id', protectedRoute, adminRoute, deleteUser);

export default router;