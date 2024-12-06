import mysql2 from 'mysql2/promise';

const db = mysql2.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.PASSWORD_DATABASE || '',
  database: process.env.DB_NAME || 'tanamanku_massive_project',
  port: 3306,
});

async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log('Berhasil terhubung ke database MYSQL!');
    connection.release();
  } catch (error) {
    console.error('Gagal terhubung ke database MYSQL! Silahkan cek kembali database anda!', error);
  }
}

async function query(command, values) {
  try {
    const [value] = await db.query(command, values ?? []);
    return value;
  } catch (error) {
    console.error(error);
  }
}

export { db, testConnection, query };
