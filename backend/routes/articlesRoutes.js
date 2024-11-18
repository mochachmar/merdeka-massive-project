import express from 'express';
import multer from 'multer';
import articlesController from '../controller/articlesController.js';

const router = express.Router();

// Konfigurasi multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder penyimpanan
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Nama file unik
  },
});
const upload = multer({ storage });

router.get('/articles', articlesController.getAllArticles);
router.get('/articles/:id', articlesController.getArticleById);
router.post('/articles', upload.single('thumbnail_image'), articlesController.createArticle);
router.put('/articles/:id', upload.single('thumbnail_image'), articlesController.updateArticle);
router.delete('/articles/:id', articlesController.deleteArticle);

export default router;
