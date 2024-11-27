import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './database/db.js';
import authRoutes from './routes/auth.route.js';
import articlesRoutes from './routes/articlesRoutes.js';
import guidesRoute from './routes/guidesRoute.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Alamat frontend saat pengembangan
  credentials: true, // Aktifkan jika ada cookies atau session
};

// Middleware
app.use(cors(corsOptions)); // Pastikan middleware ini berada di urutan atas
app.options('*', cors(corsOptions)); // Tangani permintaan preflight
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api', guidesRoute);
app.use('/api', router);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  testConnection();
  console.log('Server sedang berjalan di PORT:', PORT);
});
