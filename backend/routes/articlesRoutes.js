import express from 'express';
import articlesController from '../controllers/articlesController.js';
import { singleUpload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// API untuk articles
router.get('/', articlesController.getAllArticles);
router.get('/:id', articlesController.getArticleById);
router.post('/', singleUpload, articlesController.createArticle);
router.put('/:id', singleUpload, articlesController.updateArticle);
router.delete('/:id', articlesController.deleteArticle);

export default router;
