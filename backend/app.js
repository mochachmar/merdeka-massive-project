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

// konfigurasi Multer (untuk menyimpan gambar)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// panduan dummy (sebagai pengganti database)
let guides = [
  { guides_id: 1, title: 'Perawatan pada tanaman', description: 'Deskripsi panduan', image: 'selada.png', status: 'publik' },
  { guides_id: 2, title: 'Perawatan pada buah', description: 'Deskripsi panduan', image: 'bayam.png', status: 'Draft' },
];

// endpoint untuk mendapatkan semua panduan
app.get('/api/guides', (req, res) => {
  res.json(guides);
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

// Menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  testConnection();
  console.log('Server sedang berjalan di PORT:', PORT);
});
