import { testConnection } from './database/db.js';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// setup express app
const app = express();

// middleware
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // folder untuk menyimpan gambar
app.use(express.static('uploads')); // Folder untuk menyimpan gambar

// konfigurasi Multer (untuk menyimpan gambar)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan dengan nama unik
  },
});

const upload = multer({ storage: storage });

// panduan dummy (sebagai pengganti database)
let guides = [
  { guides_id: 1, title: 'Perawatan pada tanaman', description: 'Deskripsi panduan', image: 'selada.png', status: 'publik' },
  { guides_id: 2, title: 'Perawatan pada buah', description: 'Deskripsi panduan', image: 'bayam.png', status: 'Draft' },
];

// Artikel dummy (sebagai pengganti database)
let articles = [
  { article_id: 1, title: 'Hama pada Tanaman Selada', description: 'Deskripsi artikel...', image: 'selada.png', status: 'Publik', date: '2024-11-15' },
  { article_id: 2, title: 'Hama pada Tanaman Bayam', description: 'Deskripsi artikel...', image: 'bayam.png', status: 'Draft', date: '2024-11-14' },
];

// endpoint untuk mendapatkan semua panduan
app.get('/api/guides', (req, res) => {
  res.json(guides);
});
// Endpoint untuk mendapatkan semua artikel
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// endpoint untuk mendapatkan panduan berdasarkan id
app.get('/api/guides/:id', (req, res) => {
  const guide = guides.find((a) => a.guides_id === parseInt(req.params.id));
  if (!guide) return res.status(404).send('Guide not found');
  res.json(guide);
});

// endpoint untuk menambah panduan baru
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

// Endpoint untuk mendapatkan artikel berdasarkan ID
app.get('/api/articles/:id', (req, res) => {
  const article = articles.find((a) => a.article_id === parseInt(req.params.id));
  if (!article) return res.status(404).send('Article not found');
  res.json(article);
});

// Endpoint untuk menambah artikel
app.post('/api/articles', upload.single('image'), (req, res) => {
  const { title, description, date, status } = req.body;
  const newArticle = {
    article_id: articles.length + 1,
    title,
    description,
    date,
    status,
    image: req.file ? req.file.filename : '', // Menggunakan nama file yang diunggah
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

// Endpoint untuk mengupdate artikel
app.put('/api/articles/:id', upload.single('image'), (req, res) => {
  const { title, description, date, status } = req.body;
  const articleId = parseInt(req.params.id);
  const article = articles.find((a) => a.article_id === articleId);
  if (!article) return res.status(404).send('Article not found');

  article.title = title || article.title;
  article.description = description || article.description;
  article.date = date || article.date;
  article.status = status || article.status;
  article.image = req.file ? req.file.filename : article.image; // Update gambar jika ada yang diupload

  res.json(article);
});

// Endpoint untuk menghapus artikel
app.delete('/api/articles/:id', (req, res) => {
  const articleId = parseInt(req.params.id);
  const index = articles.findIndex((a) => a.article_id === articleId);
  if (index === -1) return res.status(404).send('Article not found');

  const deletedArticle = articles.splice(index, 1);
  res.json(deletedArticle);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  testConnection();
  console.log('Server sedang berjalan di PORT:', PORT);
});
