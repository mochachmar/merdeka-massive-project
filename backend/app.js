const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

// Setup Express app
const app = express();
const port = 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(bodyParser.json());
app.use(express.static('uploads')); // Folder untuk menyimpan gambar

// Konfigurasi Multer (untuk menyimpan gambar)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Menyimpan dengan nama unik
  },
});

const upload = multer({ storage: storage });

// Artikel dummy (sebagai pengganti database)
let articles = [
  { article_id: 1, title: 'Hama pada Tanaman Selada', description: 'Deskripsi artikel...', image: 'selada.png', status: 'Publik', date: '2024-11-15' },
  { article_id: 2, title: 'Hama pada Tanaman Bayam', description: 'Deskripsi artikel...', image: 'bayam.png', status: 'Draft', date: '2024-11-14' },
];

// Endpoint untuk mendapatkan semua artikel
app.get('/api/articles', (req, res) => {
  res.json(articles);
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

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
