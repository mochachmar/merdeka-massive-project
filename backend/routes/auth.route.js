import express from 'express';
import { login, loginAdmin, logout, logoutAdmin, signup, verifyEmail, forgotPassword, resetPassword, checkAuth, getUserData, updateUserName, deleteUserAccount, updatePassword } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/create-with-email', signup);

router.post('/sign-in', login);

router.post('/splash-login', logout);

router.post('/sign-in-admin', loginAdmin);

router.post('/sign-in-admin', logoutAdmin);

router.post('/email-code', verifyEmail);

router.post('/forgot-password', forgotPassword);

router.post('/new-password/:token', resetPassword);

router.get('/check-auth', verifyToken, checkAuth);

router.get('/user-data', verifyToken, getUserData);

router.put('/update-name', verifyToken, updateUserName);

router.post('/delete-account', verifyToken, deleteUserAccount);

router.put('/update-password', verifyToken, updatePassword);

export default router;
