import express from 'express';
import { login, loginAdmin, logout, logoutAdmin, signup, verifyEmail } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);

router.post('/sign-in', login);

router.post('/splash-login', logout);

router.post('/sign-in-admin', loginAdmin);

router.post('/sign-in-admin', logoutAdmin);

router.post('/email-code', verifyEmail);

export default router;
