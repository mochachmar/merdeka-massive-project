import express from 'express';
import { getGuides, getGuidesById, saveGuides, updateGuides, deleteGuides, getGuidesCount } from '../controllers/guidesController.js';
import uploadMiddleware from '../middleware/uploadMiddleware2.js';

const router = express.Router();

// Rute untuk menyimpan guide dengan middleware upload
router.post('/guides', uploadMiddleware, saveGuides);

// Rute lainnya
router.get('/guides', getGuides);
router.get('/guides/:id', getGuidesById);
router.put('/guides/:id', uploadMiddleware, updateGuides);
router.delete('/guides/:id', deleteGuides);
router.get('/guides/count', getGuidesCount);

export default router;
