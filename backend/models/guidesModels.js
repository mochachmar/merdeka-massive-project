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
const createGuide = async (guideData, callback) => {
  try {
    validateInput(guideData);
    const { title, thumbnail_image, short_description, long_description = null, tips_and_tricks = null, status } = guideData;

    const query = `
      INSERT INTO guides (title, thumbnail_image, short_description, long_description, tips_and_tricks, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.execute(
      query,
      [
        title,
        thumbnail_image,
        short_description,
        long_description,
        tips_and_tricks,
        validateStatus(status), // Validasi status sebelum menyimpan
      ],
      callback
    );
  } catch (error) {
    console.error('Error creating guide:', error.message);
    callback(error, null);
  }
};

// Mendapatkan semua guides
const getGuides = (callback) => {
  const query = 'SELECT * FROM guides';
  db.execute(query, callback);
};

// Mendapatkan guide berdasarkan ID
const getGuideById = (guideId, callback) => {
  const query = 'SELECT * FROM guides WHERE guide_id = ?';
  db.execute(query, [guideId], callback);
};

const updateGuide = async (guideId, guideData, callback) => {
  try {
    // Validasi input, pastikan semua field penting valid
    validateInput(guideData);

    const {
      title = '', // Default ke string kosong jika tidak ada
      thumbnail_image = '', // Default ke string kosong jika tidak ada
      short_description = '', // Default ke string kosong jika tidak ada
      long_description = null, // Default ke null
      tips_and_tricks = null, // Default ke null
      status = 'draft', // Default ke "draft"
    } = guideData;

    // Validasi status
    const validatedStatus = validateStatus(status);
    if (!validatedStatus) {
      throw new Error('Invalid status value.');
    }

    const query = `
      UPDATE guides
      SET title = ?, thumbnail_image = ?, short_description = ?, long_description = ?, tips_and_tricks = ?, status = ?
      WHERE guide_id = ?
    `;

    db.execute(
      query,
      [
        title,
        thumbnail_image || null, // Gunakan null jika kosong
        short_description || null, // Gunakan null jika kosong
        long_description || null,
        tips_and_tricks || null,
        validatedStatus,
        guideId,
      ],
      (err, result) => {
        if (err) {
          console.error('Error updating guide:', err);
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  } catch (error) {
    console.error('Error in updateGuide:', error.message);
    callback(error, null);
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
