import fs from 'fs';
import path from 'path';
import Guides from '../models/guidesModels.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mengambil semua data guides
export const getGuides = async (req, res) => {
  try {
    Guides.getGuides((err, guides) => {
      if (err) {
        console.error('Error fetching guides:', err);
        return res.status(500).send('Server Error');
      }
      res.json(guides);
    });
  } catch (error) {
    console.error('Error in getGuides:', error);
    res.status(500).send('Server Error');
  }
};

// Mengambil data guide berdasarkan guide_id
export const getGuidesById = async (req, res) => {
  try {
    Guides.getGuideById(req.params.id, (err, guide) => {
      if (err) {
        console.error('Error fetching guide:', err);
        return res.status(500).send('Server Error');
      }

      if (guide) {
        res.json(guide);
      } else {
        res.status(404).send('Guide not found');
      }
    });
  } catch (error) {
    console.error('Error in getGuidesById:', error);
    res.status(500).send('Server Error');
  }
};

// Menyimpan data guide baru
// Menyimpan data guide baru
export const saveGuides = async (req, res) => {
  try {
    // Mengambil input dari form
    const { title, short_description, status } = req.body;

    // Log untuk debugging status
    console.log('Status yang diterima dari request:', status);

    // Menangani file thumbnail image jika ada
    const thumbnail_image = req.files?.thumbnail_image ? req.files.thumbnail_image[0].originalname : null;

    // Validasi input wajib (title, short_description, dan thumbnail_image)
    if (!title || !short_description || !thumbnail_image) {
      return res.status(400).json({
        msg: 'Title, short description, and thumbnail image are required',
      });
    }

    // Default value untuk status jika tidak dikirim
    const validStatus = ['draft', 'published'];
    const finalStatus = validStatus.includes(status) ? status : 'draft'; // Validasi nilai status

    // Log final status yang akan disimpan
    console.log('Status yang akan disimpan ke database:', finalStatus);

    // Menyusun data yang akan disimpan
    const guideData = {
      title,
      short_description,
      thumbnail_image,
      long_description: null,
      tips_and_tricks: null,
      status: finalStatus, // Status valid
    };

    // Menyimpan data guide ke database
    Guides.createGuide(guideData, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Server Error');
      }
      res.status(201).json({ msg: 'Guide Created Successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update guide
export const updateGuides = async (req, res) => {
  try {
    const guideId = req.params.id;
    const { title, short_description, long_description, tips_and_tricks, status } = req.body;

    Guides.getGuideById(guideId, async (err, guide) => {
      if (err) {
        console.error('Error fetching guide for update:', err);
        return res.status(500).send('Server Error');
      }

      if (!guide) {
        return res.status(404).json({ msg: 'Guide not found' });
      }

      let fileName = guide.thumbnail_image;

      if (req.files?.thumbnail_image) {
        const file = req.files.thumbnail_image[0];
        const ext = path.extname(file.originalname).toLowerCase();
        const baseName = path.basename(file.originalname, ext);
        const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');

        fileName = `${sanitizedBaseName}${ext}`;
        const uploadPath = path.resolve(__dirname, '../public/images', fileName);

        if (guide.thumbnail_image && fs.existsSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image))) {
          fs.unlinkSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image));
        }

        try {
          await fs.promises.rename(file.path, uploadPath);
          console.log('Thumbnail image successfully moved!');
        } catch (err) {
          console.error('Error moving thumbnail image:', err);
          return res.status(500).json({ msg: 'Error moving thumbnail image' });
        }
      }

      const updateData = {
        title,
        short_description,
        long_description,
        tips_and_tricks,
        status,
        thumbnail_image: fileName,
      };

      Guides.updateGuide(guideId, updateData, (err, result) => {
        if (err) {
          console.error('Error updating guide:', err);
          return res.status(500).send('Error updating guide');
        }

        if (result.affectedRows === 0) {
          return res.status(400).json({ msg: 'No rows affected, guide may not have been updated.' });
        }

        res.status(200).json({ msg: 'Guide updated successfully' });
      });
    });
  } catch (error) {
    console.error('Error in updateGuides:', error);
    return res.status(500).json({ msg: 'Error updating guide' });
  }
};

// Menghapus guide
export const deleteGuides = async (req, res) => {
  try {
    const guideId = req.params.id;
    Guides.getGuideById(guideId, (err, existingGuide) => {
      if (err) {
        console.error('Error fetching guide for deletion:', err);
        return res.status(500).send('Server Error');
      }

      // Memastikan bahwa guide ditemukan
      if (!existingGuide) {
        return res.status(404).send('Guide not found');
      }

      // Jika ada gambar thumbnail yang terkait dengan guide, hapus gambar tersebut
      if (existingGuide.thumbnail_image) {
        const imagePath = path.resolve(__dirname, './public/images', existingGuide.thumbnail_image);

        // Mengecek apakah file gambar ada, lalu menghapusnya
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log(`Image deleted: ${imagePath}`);
        }
      }

      // Menghapus guide dari database
      Guides.deleteGuide(guideId, (err) => {
        if (err) {
          console.error('Error deleting guide:', err);
          return res.status(500).send('Error deleting guide');
        }

        res.status(200).json({ msg: 'Guide deleted successfully' });
      });
    });
  } catch (error) {
    console.error('Error in deleteGuides:', error);
    res.status(500).send('Server Error');
  }
};
