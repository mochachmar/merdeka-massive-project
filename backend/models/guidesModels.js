import { db } from '../database/db.js';

// Validasi status untuk memastikan hanya nilai yang diperbolehkan yang disimpan
const validateStatus = (status) => {
  const validStatuses = ['draft', 'published']; // Nilai yang valid
  return validStatuses.includes(status) ? status : 'draft'; // Default ke "draft" jika tidak valid
};

// Menyimpan guide baru
const createGuide = (guideData, callback) => {
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

// Memperbarui guide
const updateGuide = (guideId, guideData, callback) => {
  const { title, thumbnail_image, short_description, long_description = null, tips_and_tricks = null, status } = guideData;

  const query = `
    UPDATE guides
    SET title = ?, thumbnail_image = ?, short_description = ?, long_description = ?, tips_and_tricks = ?, status = ?
    WHERE guide_id = ?
  `;

  db.execute(
    query,
    [
      title,
      thumbnail_image,
      short_description,
      long_description,
      tips_and_tricks,
      validateStatus(status), // Validasi status sebelum memperbarui
      guideId,
    ],
    callback
  );
};

// Menghapus guide berdasarkan ID
const deleteGuide = (guideId, callback) => {
  const query = 'DELETE FROM guides WHERE guide_id = ?';
  db.execute(query, [guideId], callback);
};

export default {
  createGuide,
  getGuides,
  getGuideById,
  updateGuide,
  deleteGuide,
};
