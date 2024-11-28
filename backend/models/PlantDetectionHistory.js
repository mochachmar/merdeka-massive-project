import { db } from '../database/db.js'; // Import koneksi database Anda

// Fungsi untuk menyimpan hasil deteksi ke database
const saveDetection = async (plantId, userId, className, solution) => {
  try {
    // Query untuk menyimpan hasil deteksi ke tabel plantdetectionhistory
    const [result] = await db.query(
      `INSERT INTO plantdetectionhistory (plant_id, user_id, class_name, solution) 
       VALUES (?, ?, ?, ?)`,
      [plantId, userId, className, solution]
    );

    return result.insertId; // Mengembalikan ID dari deteksi yang baru disimpan
  } catch (error) {
    console.error('Error saving detection:', error);
    throw error; // Melempar error agar bisa ditangani di tempat lain
  }
};

// Fungsi untuk mendapatkan semua hasil deteksi
const getAllDetections = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM plantdetectionhistory');
    return rows;
  } catch (error) {
    console.error('Error fetching detections:', error);
    throw error;
  }
};

// Fungsi untuk mendapatkan deteksi berdasarkan ID
const getDetectionById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM plantdetectionhistory WHERE detection_id = ?', [id]);
    return rows[0]; // Mengembalikan satu deteksi berdasarkan ID
  } catch (error) {
    console.error('Error fetching detection by ID:', error);
    throw error;
  }
};

// Fungsi untuk mengupdate hasil deteksi (misalnya setelah verifikasi atau pembaruan solusi)
const updateDetection = async (id, plantId, userId, className, solution) => {
  try {
    const [result] = await db.query(
      `UPDATE plantdetectionhistory 
       SET plant_id = ?, user_id = ?, class_name = ?, solution = ? 
       WHERE detection_id = ?`,
      [plantId, userId, className, solution, id]
    );

    return result.affectedRows > 0; // Mengembalikan true jika ada perubahan
  } catch (error) {
    console.error('Error updating detection:', error);
    throw error;
  }
};

// Fungsi untuk menghapus hasil deteksi berdasarkan ID
const deleteDetection = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM plantdetectionhistory WHERE detection_id = ?', [id]);
    return result.affectedRows > 0; // Mengembalikan true jika berhasil dihapus
  } catch (error) {
    console.error('Error deleting detection:', error);
    throw error;
  }
};

export { saveDetection, getAllDetections, getDetectionById, updateDetection, deleteDetection };
