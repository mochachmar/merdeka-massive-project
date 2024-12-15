// routes/auth.route.js
import express from 'express';
import passport from 'passport';
import {
  login,
  loginAdmin,
  logout,
  logoutAdmin,
  signup,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth,
  getUserData,
  updateUserName,
  deleteUserAccount,
  updatePassword,
  updatePersonalSettingAdmin,
  deleteAdminAccount,
  checkAuthAdmin,
  changeAdminPassword,
  setPassword,
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

const router = express.Router();

// User Routes
router.post('/create-with-email', signup);
router.post('/sign-in', login);
router.post('/logout', verifyToken, logout);
router.post('/splash-login', logout);
router.post('/email-code', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/new-password/:token', resetPassword);
router.get('/check-auth', verifyToken, checkAuth);
router.get('/user-data', verifyToken, getUserData);
router.put('/update-name', verifyToken, updateUserName);
router.post('/delete-account', verifyToken, deleteUserAccount);
router.put('/update-password', verifyToken, updatePassword);

// Rute inisiasi autentikasi Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Rute callback Google OAuth
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/error-page-401', session: false }), (req, res) => {
  // Setelah autentikasi berhasil, generate token dan set cookie
  const token = generateTokenAndSetCookie(res, req.user.id);

  // Redirect ke frontend dengan token sebagai query parameter
  res.redirect(`http://localhost:5173/splash-login?token=${token}`);
});

// Rute untuk kegagalan autentikasi Google
router.get('/google/failure', (req, res) => {
  res.status(401).json({ success: false, message: 'Autentikasi Google gagal.' });
});
router.put('/set-password', verifyToken, setPassword);

// Admin Routes
router.post('/sign-in-admin', loginAdmin);
router.post('/logout-admin', verifyAdminToken, logoutAdmin);
router.put('/admin/update-personal-setting', verifyAdminToken, updatePersonalSettingAdmin);
router.post('/admin/delete-account', verifyAdminToken, deleteAdminAccount);
router.put('/admin/change-password', verifyAdminToken, changeAdminPassword);
router.get('/check-auth-admin', verifyAdminToken, checkAuthAdmin);

export default router;
