import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRoutes from './routes/articlesRoutes.js';
import { testConnection } from './config/db.js';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config(); // Load .env configuration

const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: 'http://localhost:5173', // Alamat frontend saat pengembangan
  credentials: true, // Aktifkan jika ada cookies atau session
};
app.use(cors(corsOptions));

// Middleware untuk parsing JSON
app.use(express.json());

// Routes
app.use('/api/articles', articlesRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Test koneksi ke database
testConnection();

// Jalankan server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
