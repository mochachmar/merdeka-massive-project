import express from 'express';
import { addPlantHistory } from '../controllers/plantController.js';
import upload from '../middleware/uploadTanamanMiddleware.js';
const router = express.Router();

// Rute untuk menambahkan tanaman
router.post('/upload-tanaman', upload.single('file'), addPlantHistory);

export default router;
