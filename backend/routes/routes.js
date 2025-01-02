// routes.js
import express from 'express';
import { addPlantHistory, fetchPlantHistory, removeAllPlantHistory } from '../controllers/plantController.js';
import upload from '../middleware/uploadTanamanMiddleware.js';
import { verifyToken } from '../middleware/verifyToken.js'; // Import verifyToken

const router = express.Router();

// Rute untuk menambahkan tanaman dan history kesehatan, dilindungi oleh verifyToken
router.post('/upload-tanaman', verifyToken, upload.single('file'), addPlantHistory);

// Route untuk mengambil histori tanaman, dilindungi oleh verifyToken
router.get('/history-tanaman', verifyToken, fetchPlantHistory);

// Route untuk menghapus semua riwayat tanaman, dilindungi oleh verifyToken (opsional)
router.delete('/history-tanaman', verifyToken, removeAllPlantHistory);

export default router;
