import express from 'express';
import { getGuides, getGuidesById, saveGuides, updateGuides, deleteGuides, getGuidesCount } from '../controllers/guidesController.js';
import uploadMiddleware from '../middleware/uploadMiddleware2.js';
import uploadMiddleware2 from '../middleware/uploadMiddleware2.js';

const router = express.Router();

// Rute untuk menyimpan guide dengan middleware upload
router.post('/guides', uploadMiddleware2, saveGuides);

// Rute lainnya
router.get('/guides', getGuides);
router.get('/guides/:id', getGuidesById);
router.put('/guides/:id', uploadMiddleware2, updateGuides);
router.delete('/guides/:id', deleteGuides);
router.get('/guides/count', getGuidesCount);

export default router;
