import { testConnection } from './database/db.js';
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Konfigurasi CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true,
  })
);

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('uploads'));

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
app.get('/api/guides', (req, res) => {
  res.json(guides);
});

app.get('/api/articles', (req, res) => {
  res.json(articles);
});

app.get('/api/guides/:id', (req, res) => {
  const guide = guides.find((a) => a.guides_id === parseInt(req.params.id));
  if (!guide) return res.status(404).send('Guide not found');
  res.json(guide);
});

app.post('/api/guides', upload.single('thumbnail_image'), (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status || !req.file) {
    return res.status(400).send('All fields are required');
  }
  const newGuide = {
    guides_id: guides.length + 1,
    title,
    description,
    image: req.file.filename,
    status,
  };
  guides.push(newGuide);
  res.status(201).json(newGuide);
});

app.get('/api/articles/:id', (req, res) => {
  const article = articles.find((a) => a.article_id === parseInt(req.params.id));
  if (!article) return res.status(404).send('Article not found');
  res.json(article);
});

app.post('/api/articles', upload.single('image'), (req, res) => {
  const { title, description, date, status } = req.body;
  const newArticle = {
    article_id: articles.length + 1,
    title,
    description,
    date,
    status,
    image: req.file ? req.file.filename : '',
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.put('/api/articles/:id', upload.single('image'), (req, res) => {
  const { title, description, date, status } = req.body;
  const articleId = parseInt(req.params.id);
  const article = articles.find((a) => a.article_id === articleId);
  if (!article) return res.status(404).send('Article not found');

  article.title = title || article.title;
  article.description = description || article.description;
  article.date = date || article.date;
  article.status = status || article.status;
  article.image = req.file ? req.file.filename : article.image;

  res.json(article);
});

app.delete('/api/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const index = articles.findIndex((a) => a.article_id === articleId);
  if (index === -1) return res.status(404).send('Article not found');

  const deletedArticle = articles.splice(index, 1);
  res.json(deletedArticle);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 8080;
app.listen(PORT, () => {
  testConnection();
  console.log('Server sedang berjalan di PORT:', PORT);
});
