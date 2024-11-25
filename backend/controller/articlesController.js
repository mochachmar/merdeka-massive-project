import fs from 'fs';
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../models/articles.js';

const articlesController = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await getAllArticles();
      res.json(articles);
    } catch (error) {
      console.error('Error fetching articles:', error.message);
      res.status(500).send('Server Error');
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await getArticleById(req.params.id);
      if (!article) return res.status(404).send('Article not found');
      res.json(article);
    } catch (error) {
      console.error('Error fetching article:', error.message);
      res.status(500).send('Server Error');
    }
  },

  createArticle: async (req, res) => {
    try {
      const { title, short_description, long_description, publish_date, status, created_by } = req.body;
      const thumbnail_image = req.file ? req.file.filename : null;

      const newArticleId = await createArticle({
        title,
        thumbnail_image,
        short_description,
        long_description,
        publish_date,
        status,
        created_by,
      });

      res.status(201).json({ id: newArticleId });
    } catch (error) {
      console.error('Error creating article:', error.message);
      res.status(500).send('Server Error');
    }
  },

  updateArticle: async (req, res) => {
    try {
      const { title, short_description, long_description, publish_date, status, created_by } = req.body;
      const articleId = req.params.id;

      const existingArticle = await getArticleById(articleId);
      if (!existingArticle) return res.status(404).send('Article not found');

      if (req.file) {
        const oldImagePath = `uploads/${existingArticle.thumbnail_image}`;
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      const thumbnail_image = req.file ? req.file.filename : existingArticle.thumbnail_image;

      const success = await updateArticle(articleId, {
        title,
        thumbnail_image,
        short_description,
        long_description,
        publish_date,
        status,
        created_by,
      });

      if (success) {
        res.send('Article updated');
      } else {
        res.status(404).send('Article not found');
      }
    } catch (error) {
      console.error('Error updating article:', error.message);
      res.status(500).send('Server Error');
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const articleId = req.params.id;

      const existingArticle = await getArticleById(articleId);
      if (!existingArticle) return res.status(404).send('Article not found');

      const oldImagePath = `uploads/${existingArticle.thumbnail_image}`;
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }

      const success = await deleteArticle(articleId);
      if (success) {
        res.send('Article deleted');
      } else {
        res.status(404).send('Article not found');
      }
    } catch (error) {
      console.error('Error deleting article:', error.message);
      res.status(500).send('Server Error');
    }
  },
};

export default articlesController;
