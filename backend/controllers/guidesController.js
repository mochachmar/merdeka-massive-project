import fs from 'fs';
import path from 'path';
import Guides from '../models/guidesModels.js';
import { fileURLToPath } from 'url';
import { db } from '../database/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mengambil semua data guides
export const getGuides = async (req, res) => {
  try {
    const guides = await Guides.getGuides(); // Use await instead of callback
    res.json(guides);
  } catch (error) {
    console.error('Error in getGuides:', error);
    res.status(500).send('Server Error');
  }
};

// Mengambil data guide berdasarkan guide_id
export const getGuidesById = async (req, res) => {
  try {
    const guideId = req.params.id;
    const guide = await Guides.getGuideById(guideId); // Panggil fungsi di model

    if (!guide) {
      return res.status(404).send('Guide not found');
    }

    res.json(guide); // Kirimkan data panduan
  } catch (error) {
    console.error('Error in getGuidesById:', error.message);
    res.status(500).send('Server Error');
  }
};


// Menyimpan data guide baru
export const saveGuides = async (req, res) => {
  try {
    const { title, short_description, long_description, tips_and_tricks, status } = req.body;
    const thumbnail_image = req.file ? req.file.filename : null;

    // Validasi input
    if (!title || !short_description || !long_description || !tips_and_tricks || !thumbnail_image) {
      return res.status(400).json({
        msg: 'Semua field wajib diisi!',
      });
    }

    const validStatus = ['Draft', 'Published'];
    const finalStatus = validStatus.includes(status) ? status : 'Draft';

    const guideData = {
      title,
      short_description,
      long_description, // Ambil dari req.body
      tips_and_tricks,  // Ambil dari req.body
      thumbnail_image,
      status: finalStatus,
    };

    // Simpan data ke database
    await Guides.createGuide(guideData);

    res.status(201).json({ msg: 'Guide berhasil dibuat' });
  } catch (error) {
    console.error('Error di saveGuides:', error.message);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};



// Update guide
// Update guide
export const updateGuides = async (req, res) => {
  try {
    const guideId = req.params.id;
    const { title, short_description, long_description, tips_and_tricks, status } = req.body;

    const guide = await Guides.getGuideById(guideId);
    if (!guide) {
      return res.status(404).json({ msg: 'Guide tidak ditemukan' });
    }

    let fileName = guide.thumbnail_image;

    // Handle file upload
    if (req.file) {
      fileName = req.file.filename;
      const uploadPath = path.resolve(__dirname, '../public/images', fileName);

      // Hapus gambar lama jika ada
      if (guide.thumbnail_image && fs.existsSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image))) {
        fs.unlinkSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image));
      }

      await fs.promises.rename(req.file.path, uploadPath);
    }

    // Update data
    const updateData = {
      title: title || guide.title,
      short_description: short_description || guide.short_description,
      long_description: long_description || guide.long_description,
      tips_and_tricks: tips_and_tricks || guide.tips_and_tricks,
      status: status || guide.status,
      thumbnail_image: fileName,
    };

    const result = await Guides.updateGuide(guideId, updateData);

    // Log untuk melihat hasil update
    console.log(result);

    // Menyediakan feedback yang tepat berdasarkan affectedRows
    if (result && result.affectedRows > 0) {
      res.status(200).json({ msg: 'Guide berhasil diperbarui' });
    } else {
      res.status(400).json({ msg: 'Tidak ada perubahan yang dilakukan pada panduan.' });
    }
  } catch (error) {
    console.error('Error di updateGuides:', error.message);
    res.status(500).json({ msg: 'Terjadi kesalahan pada server' });
  }
};


// Menghapus guide
export const deleteGuides = async (req, res) => {
  try {
    const guideId = req.params.id;

    const result = await db.execute('DELETE FROM guides WHERE guide_id = ?', [guideId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (err) {
    console.error('Error deleting guide:', err);
    res.status(500).json({ message: 'Failed to delete guide' });
  }
};


export const getGuidesCount = async (req, res) => {
  try {
    const guides = await Guides.getGuides();
    res.json({ count: guides.length }); // Return the count of guides
  } catch (error) {
    console.error('Error fetching guides count:', error);
    res.status(500).send('Server Error');
  }
};
