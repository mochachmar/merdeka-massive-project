import express from 'express';
import dotenv from 'dotenv';
import { testConnection } from './database/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import articlesRoutes from './routes/articlesRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/articles', articlesRoutes);

app.listen(3000, () => {
  testConnection();
  console.log('Server sedang berjalan di PORT:', PORT);
});