// auth.controller.js
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';
import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken'; // Ditambahkan
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error('All fields are required');
    }

    // Check if the user already exists
    const userAlreadyExists = await User.findByEmail(email);

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: 'User sudah login' });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a new user
    const userId = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    // Fetch the created user
    const newUser = await User.findById(userId);

    // Generate JWT dan set cookie
    generateTokenAndSetCookie(res, newUser.id);

    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).json({
      success: true,
      message: 'Berhasil menambahkan user !',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isVerified: newUser.isVerified,
        verificationToken: newUser.verificationToken,
        verificationTokenExpiresAt: newUser.verificationTokenExpiresAt,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    // Pastikan kondisi diisi dengan benar
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: Date.now(),
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Kode verifikasi sudah kadaluarsa atau salah memasukkan kode',
      });
    }

    // Update user untuk memverifikasi email
    await User.update(user.id, {
      isVerified: true,
      verificationToken: null,
      verificationTokenExpiresAt: null,
    });

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: 'Email berhasil diverifikasi!',
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error('Gagal verifikasi email:', error);
    res.status(500).json({ success: false, message: 'Server lagi error!' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Gagal login! Mohon periksa email dan password Anda!' });
    }

    // Cek apakah user memiliki password
    if (!user.password) {
      return res.status(400).json({ success: false, message: 'Akun ini dibuat menggunakan Google OAuth. Silakan login dengan Google.' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Gagal login! Mohon periksa email dan password Anda!' });
    }

    // Generate JWT dan set cookie untuk pengguna biasa
    generateTokenAndSetCookie(res, user.id, 'user');

    // Update lastLogin timestamp
    const updateData = { lastLogin: new Date() };
    await User.update(user.id, updateData);

    res.status(200).json({
      success: true,
      message: 'Berhasil login!',
      user: {
        ...user,
        password: undefined, // Sembunyikan password
      },
    });
  } catch (error) {
    console.log('Gagal login! ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan kata sandi wajib diisi!' });
    }

    // Cari admin berdasarkan email
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Gagal login! Email atau kata sandi salah.' });
    }

    // Verifikasi kata sandi
    const isPasswordValid = await bcryptjs.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Gagal login! Email atau kata sandi salah.' });
    }

    // Generate JWT dan set cookie untuk admin
    generateTokenAndSetCookie(res, admin.admin_id, 'admin');

    res.status(200).json({
      success: true,
      message: 'Berhasil login sebagai admin!',
      admin: {
        id: admin.admin_id,
        email: admin.email,
        username: admin.username,
      },
    });
  } catch (error) {
    console.error('Gagal login admin:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan server!' });
  }
};

export const logout = async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ success: true, message: 'Berhasil keluar dari akun!' });
};

export const logoutAdmin = async (req, res) => {
  try {
    res.clearCookie('adminToken');
    res.status(200).json({ success: true, message: 'Berhasil logout dari akun admin!' });
  } catch (error) {
    console.error('Gagal logout admin:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat logout admin.' });
  }
};

// Fungsi lainnya tetap sama...

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Use User.findByEmail to properly query the database for the email
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ success: false, message: 'Akun tidak ditemukan!' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex'); // Generate a unique reset token
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // Set expiration to 1 hour from now

    // Ensure reset token and expiration date are valid before saving
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetPasswordExpiresAt; // Set the expiration time

    // Save user dengan updated reset password token dan expiration
    await User.update(user.id, {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt: new Date(resetPasswordExpiresAt),
    });

    console.log('Token reset password di update:', resetToken, resetPasswordExpiresAt);

    // Send password reset email dengan reset token URL
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}new-password/${resetToken}`);

    res.status(200).json({ success: true, message: 'Link reset password berhasil dikirim di email Anda!' });
  } catch (error) {
    console.log('Terjadi error saat reset password! ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Cari user berdasarkan token dan waktu kadaluarsa
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: Date.now(),
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Terjadi error! Token reset tidak valid atau kedaluwarsa' });
    }

    // Update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.update(user.id, {
      password: hashedPassword,
      resetPasswordToken: null, // Hapus token
      resetPasswordExpiresAt: null, // Hapus waktu kadaluarsa
    });

    await sendResetSuccessEmail(user.email);

    res.status(200).json({ success: true, message: 'Reset password berhasil!' });
  } catch (error) {
    console.log('Terjadi error saat reset password! ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ success: false, message: 'Akun tidak ditemukan!' });
    }

    // Exclude the password field before sending the response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.log('Terjadi error saat pengecekan autentikasi! ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // userId diambil dari token
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
    }

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Terjadi kesalahan', error: error.message });
  }
};

export const updateUserName = async (req, res) => {
  const { name } = req.body;
  try {
    await User.update(req.userId, { name });
    res.status(200).json({ success: true, message: 'Nama berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui nama', error: error.message });
  }
};

export const deleteUserAccount = async (req, res) => {
  const { password } = req.body; // Ambil password dari request body
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan!' });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Password salah!' });
    }

    await User.delete(userId);
    res.status(200).json({ success: true, message: 'Akun berhasil dihapus!' });
  } catch (error) {
    console.error('Gagal menghapus akun:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus akun.' });
  }
};

export const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.userId; // Ambil userId dari token

  try {
    // Cari user berdasarkan ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User tidak ditemukan!' });
    }

    // Verifikasi password lama
    const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: 'Password lama salah!' });
    }

    // Hash password baru
    const hashedNewPassword = await bcryptjs.hash(newPassword, 10);

    // Update password di database
    await User.update(userId, { password: hashedNewPassword });

    res.status(200).json({ success: true, message: 'Kata sandi berhasil diubah!' });
  } catch (error) {
    console.error('Gagal mengubah password:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengubah password.' });
  }
};

export const createAdmin = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!email || !username || !password) {
      throw new Error('Semua field wajib diisi');
    }

    // Cek apakah admin sudah ada
    const adminAlreadyExists = await Admin.findByEmail(email);
    if (adminAlreadyExists) {
      return res.status(400).json({ success: false, message: 'Admin sudah ada' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Buat admin baru
    const adminId = await Admin.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: 'Admin berhasil dibuat!',
      admin: {
        id: adminId,
        email,
        username,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updatePersonalSettingAdmin = async (req, res) => {
  const { email, username } = req.body;
  const adminId = req.adminId; // Diambil dari middleware verifyAdminToken

  try {
    if (!email || !username) {
      return res.status(400).json({ success: false, message: 'Email dan Nama wajib diisi!' });
    }

    // Periksa apakah email sudah digunakan oleh admin lain
    const existingAdmin = await Admin.findByEmail(email);
    if (existingAdmin && existingAdmin.admin_id !== adminId) {
      return res.status(400).json({ success: false, message: 'Email sudah digunakan oleh admin lain!' });
    }

    // Update data admin
    await Admin.update(adminId, { email, username });

    res.status(200).json({ success: true, message: 'Informasi pribadi berhasil diperbarui!' });
  } catch (error) {
    console.error('Gagal memperbarui informasi pribadi admin:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memperbarui informasi pribadi.' });
  }
};

export const deleteAdminAccount = async (req, res) => {
  const adminId = req.adminId; // Diambil dari middleware verifyAdminToken

  try {
    // Hapus akun admin
    await Admin.delete(adminId);

    // Clear cookie adminToken
    res.clearCookie('adminToken');

    res.status(200).json({ success: true, message: 'Akun admin berhasil dihapus!' });
  } catch (error) {
    console.error('Gagal menghapus akun admin:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat menghapus akun admin.' });
  }
};

export const checkAuthAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(400).json({ success: false, message: 'Akun admin tidak ditemukan!' });
    }

    // Exclude the password field before sending the response
    const { password, ...adminWithoutPassword } = admin;

    res.status(200).json({ success: true, user: { ...adminWithoutPassword, role: 'admin' } });
  } catch (error) {
    console.log('Terjadi error saat pengecekan autentikasi admin! ', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const changeAdminPassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const adminId = req.adminId; // Diambil dari middleware verifyAdminToken

  try {
    // Validasi input
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'Semua kolom wajib diisi!' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Kata sandi baru dan konfirmasi tidak cocok!' });
    }

    // Cari admin berdasarkan ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: 'Admin tidak ditemukan!' });
    }

    // Verifikasi kata sandi lama menggunakan bcryptjs
    const isMatch = await bcryptjs.compare(oldPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Kata sandi lama salah!' });
    }

    // Hash kata sandi baru menggunakan bcryptjs
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    // Update kata sandi admin
    await Admin.update(adminId, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Kata sandi berhasil diperbarui!' });
  } catch (error) {
    console.error('Gagal mengganti kata sandi admin:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengganti kata sandi.' });
  }
};

export const setPassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.userId;

  try {
    if (!password) {
      return res.status(400).json({ success: false, message: 'Password wajib diisi!' });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.update(userId, { password: hashedPassword });

    res.status(200).json({ success: true, message: 'Password berhasil diatur!' });
  } catch (error) {
    console.error('Gagal mengatur password:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat mengatur password.' });
  }
};
