// routes.js
import express from 'express';
import { addPlantHistory, fetchPlantHistory, removeAllPlantHistory } from '../controllers/plantController.js';
import upload from '../middleware/uploadTanamanMiddleware.js';
const router = express.Router();

// Rute untuk menambahkan tanaman dan history kesehatan
router.post('/upload-tanaman', upload.single('file'), addPlantHistory);

// Route untuk mengambil histori tanaman
router.get('/history-tanaman', fetchPlantHistory);

// Route untuk menghapus semua riwayat tanaman
router.delete('/history-tanaman', removeAllPlantHistory);

export default router;
