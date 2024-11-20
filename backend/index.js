import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRoutes from './routes/articlesRoutes.js';
import { testConnection } from './config/db.js';

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

// Test koneksi ke database
testConnection();

// Jalankan server
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
