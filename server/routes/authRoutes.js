import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getMe, googleAuth } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/google', googleAuth);

export default router;