import express from 'express';
import {
  getGuides, 
  getGuidesById, 
  saveGuides, 
  updateGuides, 
  deleteGuides
} from '../controllers/guidesController.js'; 
import uploadMiddleware from '../middleware/uploadMiddleware.js';

const router = express.Router();


router.post('/guides', uploadMiddleware, saveGuides);  

// Route lainnya
router.get('/guides', getGuides);
router.get('/guides/:id', getGuidesById); 
router.patch('/guides/:id', updateGuides);
router.delete('/guides/:id', deleteGuides);

export default router;
