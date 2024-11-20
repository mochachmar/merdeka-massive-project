import express from 'express';
import { login, loginAdmin, logout, logoutAdmin, signup, verifyEmail, forgotPassword, resetPassword, checkAuth } from '../controllers/auth.controller.js';
import { addPlantHistory } from '../controllers/plantController.js';
import { verifyToken } from '../middleware/verifyToken.js';
import upload from '../middleware/uploadTanamanMiddleware.js';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', login);

router.post('/splash-login', logout);

router.post('/sign-in-admin', loginAdmin);

router.post('/sign-in-admin', logoutAdmin);

router.post('/email-code', verifyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/new-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

router.post('/tanaman', upload.single('file'), addPlantHistory);

export default router;
