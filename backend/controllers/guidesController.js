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
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { title, short_description, status } = req.body;
    const thumbnail_image = req.file ? req.file.originalname : null;

    if (!title || !short_description || !thumbnail_image) {
      return res.status(400).json({
        msg: 'Title, short description, and thumbnail image are required',
      });
    }

    const validStatus = ['Draft', 'Published'];
    const finalStatus = validStatus.includes(status) ? status : 'Draft';

    const guideData = {
      title,
      short_description,
      thumbnail_image,
      long_description: null,
      tips_and_tricks: null,
      status: finalStatus,
    };

    await Guides.createGuide(guideData); // Simpan data ke database
    res.status(201).json({ msg: 'Guide Created Successfully' });
  } catch (error) {
    console.error('Error in saveGuides:', error.message);
    res.status(500).send('Server Error');
  }
};


// Update guide
// Update guide
export const updateGuides = async (req, res) => {
  try {
    const guideId = req.params.id;
    const { title, short_description, long_description, tips_and_tricks, status } = req.body;

    // Fetch guide data
    const guide = await Guides.getGuideById(guideId);
    if (!guide) {
      return res.status(404).json({ msg: 'Guide not found' });
    }

    let fileName = guide.thumbnail_image;

    // Handle file upload
    if (req.file) {
      fileName = req.file.filename;
      const uploadPath = path.resolve(__dirname, '../public/images', fileName);

      // Delete old image if exists
      if (guide.thumbnail_image && fs.existsSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image))) {
        fs.unlinkSync(path.resolve(__dirname, '../public/images', guide.thumbnail_image));
      }

      try {
        await fs.promises.rename(req.file.path, uploadPath);
      } catch (err) {
        console.error('Error moving uploaded image:', err);
        return res.status(500).json({ msg: 'Error processing image upload' });
      }
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
    if (result.affectedRows > 0) {
      res.status(200).json({ msg: 'Guide updated successfully' });
    } else {
      res.status(400).json({ msg: 'No changes made' });
    }
  } catch (error) {
    console.error('Error in updateGuides:', error.message);
    res.status(500).json({ msg: 'Server Error' });
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
