import { db } from '../database/db.js';

// Validasi status
const validateStatus = (status) => {
  const validStatuses = ['Draft', 'Published'];
  return validStatuses.includes(status) ? status : 'draft';
};

// Validasi data input
const validateInput = (guideData) => {
  const { title, short_description } = guideData;
  if (!title || !short_description) {
    throw new Error('Title and short description are required.');
  }
};

// Menyimpan guide baru
const createGuide = async (guideData) => {
  const { title, thumbnail_image, short_description, long_description = '', tips_and_tricks = '', status } = guideData;
  const query = `
    INSERT INTO guides (title, thumbnail_image, short_description, long_description, tips_and_tricks, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  return await db.execute(query, [title, thumbnail_image, short_description, long_description, tips_and_tricks, status]);
};


// Mendapatkan semua guides
const getGuides = async () => {
  const query = 'SELECT * FROM guides';
  try {
    const [rows] = await db.execute(query);
    return rows;
  } catch (error) {
    console.error('Error fetching guides:', error.message);
    throw error;
  }
};

// Mendapatkan guide berdasarkan ID
const getGuideById = async (guideId) => {
  const query = 'SELECT * FROM guides WHERE guide_id = ?'; // Pastikan SELECT mencakup semua kolom
  try {
    const [rows] = await db.execute(query, [guideId]);
    return rows[0]; // Ambil data panduan tunggal
  } catch (error) {
    console.error('Error fetching guide by ID:', error.message);
    throw error;
  }
};


// Update guide
const updateGuide = async (guideId, guideData) => {
  const { title, thumbnail_image, short_description, long_description = '', tips_and_tricks = '', status } = guideData;
  const query = `
    UPDATE guides
    SET title = ?, thumbnail_image = ?, short_description = ?, long_description = ?, tips_and_tricks = ?, status = ?
    WHERE guide_id = ?
  `;
  const [result] = await db.execute(query, [title, thumbnail_image, short_description, long_description, tips_and_tricks, status, guideId]);
  
  return result; // Pastikan result dikembalikan agar dapat diakses di controller
};

// Menghapus guide
const deleteGuide = async (guideId) => {
  try {
    const query = 'DELETE FROM guides WHERE guide_id = ?';
    const [result] = await db.execute(query, [guideId]);
    return result;
  } catch (error) {
    console.error('Error deleting guide:', error.message);
    throw error;
  }
};

export default {
  createGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
};
