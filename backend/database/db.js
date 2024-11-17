import mysql2 from 'mysql2/promise';

const db = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tanamanku_massive_project',
});

async function testConnection() {
  try {
    await db.getConnection();
    console.log('Berhasil terhubung ke database MYSQL!');
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
