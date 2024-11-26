import { db } from '../database/db.js';

// Validasi status untuk memastikan hanya nilai yang diperbolehkan yang disimpan
const validateStatus = (status) => {
  const validStatuses = ['draft', 'published']; // Nilai yang valid
  return validStatuses.includes(status) ? status : 'draft'; // Default ke "draft" jika tidak valid
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
  try {
    validateInput(guideData);
    const { title, thumbnail_image, short_description, long_description = null, tips_and_tricks = null, status } = guideData;

    const query = `
      INSERT INTO guides (title, thumbnail_image, short_description, long_description, tips_and_tricks, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(query, [title, thumbnail_image, short_description, long_description, tips_and_tricks, validateStatus(status)]);

    return result;
  } catch (error) {
    console.error('Error creating guide:', error.message);
    throw error;
  }
};

// Mendapatkan semua guides
const getGuides = async () => {
  const query = 'SELECT * FROM guides';
  try {
    const [rows] = await db.execute(query); // Use await with promises
    return rows;
  } catch (error) {
    console.error('Error fetching guides:', error.message);
    throw error;
  }
};

// Mendapatkan guide berdasarkan ID
const getGuideById = (guideId, callback) => {
  const query = 'SELECT * FROM guides WHERE guide_id = ?';
  db.execute(query, [guideId], callback);
};

const updateGuide = async (guideId, guideData) => {
  try {
    validateInput(guideData);

    const { title = '', thumbnail_image = '', short_description = '', long_description = null, tips_and_tricks = null, status = 'draft' } = guideData;

    const validatedStatus = validateStatus(status);
    const query = `
      UPDATE guides
      SET title = ?, thumbnail_image = ?, short_description = ?, long_description = ?, tips_and_tricks = ?, status = ?
      WHERE guide_id = ?
    `;

    const [result] = await db.execute(query, [title, thumbnail_image || null, short_description || null, long_description || null, tips_and_tricks || null, validatedStatus, guideId]);

    return result;
  } catch (error) {
    console.error('Error in updateGuide:', error.message);
    throw error;
  }
};

// Menghapus guide berdasarkan ID
const deleteGuide = (guideId, callback) => {
  const query = 'SELECT * FROM guides WHERE guide_id = ?';
  db.execute(query, [guideId], (err, result) => {
    if (err) {
      console.error('Error fetching guide for deletion:', err.message);
      return callback(err, null);
    }

    if (result.length === 0) {
      return callback(null, { message: 'Guide not found' });
    }

    // Hapus guide jika ditemukan
    const deleteQuery = 'DELETE FROM guides WHERE guide_id = ?';
    db.execute(deleteQuery, [guideId], callback);
  });
};

export default {
  createGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
};
