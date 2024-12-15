// middleware/verifyAdminToken.js
import jwt from 'jsonwebtoken';

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Tidak ada token admin yang diberikan!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Token admin tidak valid!' });
    }
    req.adminId = decoded.adminId; // Pastikan JWT mengandung adminId
    next();
  } catch (error) {
    console.error('Error verifying admin token:', error);
    return res.status(401).json({ success: false, message: 'Gagal memverifikasi token admin!' });
  }
};
