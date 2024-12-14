// auth.route.js
import express from 'express';
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
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { verifyAdminToken } from '../middleware/verifyAdminToken.js';

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

// Admin Routes
router.post('/sign-in-admin', loginAdmin); // Hanya untuk login admin
router.post('/logout-admin', verifyAdminToken, logoutAdmin); // Tambahkan rute logout admin
router.put('/admin/update-personal-setting', verifyAdminToken, updatePersonalSettingAdmin);
router.post('/admin/delete-account', verifyAdminToken, deleteAdminAccount);
router.put('/admin/change-password', verifyAdminToken, changeAdminPassword);
router.get('/check-auth-admin', verifyAdminToken, checkAuthAdmin);

export default router;
