// utils/generateTokenAndSetCookie.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Fungsi untuk menghasilkan token JWT dan mengatur cookie.
 * @param {object} res - Response object dari Express.
 * @param {string} id - ID pengguna atau admin.
 * @param {string} role - Role pengguna ('user' atau 'admin').
 * @returns {string} Token JWT yang dihasilkan.
 */
export const generateTokenAndSetCookie = (res, id, role = 'user') => {
  // Tentukan payload berdasarkan role
  const payload = role === 'admin' ? { adminId: id, role: 'admin' } : { userId: id };

  // Tentukan durasi dan nama cookie berdasarkan role
  const expiresIn = role === 'admin' ? '1h' : '7d';
  const cookieName = role === 'admin' ? 'adminToken' : 'token';

  // Generate JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });

  // Set cookie dengan nama yang sesuai
  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Pastikan secure hanya di produksi
    sameSite: 'strict',
    maxAge: role === 'admin' ? 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000, // 1 jam untuk admin, 7 hari untuk user
  });

  return token;
};
