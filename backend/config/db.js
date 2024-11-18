import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load konfigurasi dari .env

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Berhasil terhubung ke database!');
    connection.release();
  } catch (error) {
    console.error('Gagal terhubung ke database:', error);
  }
}

export { db, testConnection };
