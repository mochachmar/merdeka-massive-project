// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token || req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Terjadi error saat pengecekan autentikasi! Tidak ada token yang diberikan!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ success: false, message: 'Terjadi error saat pengecekan autentikasi! Token yang diberikan tidak valid!' });
    req.userId = decoded.userId || decoded.adminId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Terjadi kesalahan dalam verifikasi token!' });
  }
};

export default verifyToken;
