import { insertPlant } from '../models/plantModel.js';

export const addPlantHistory = async (req, res) => {
  try {
    const { plant_name, scientific_name, description, care_instructions, created_by } = req.body;

    // Ambil `photo_url` dari file upload jika ada
    const photo_url = req.file ? req.file.path : null;
    console.log('Photo URL:', photo_url);
    console.log('File:', req.file); // Debugging file
    console.log('Body:', req.body); // Debugging body data

    // Validasi input
    if (!plant_name || !created_by || !photo_url) {
      return res.status(400).json({ message: 'plant_name, created_by, and photo_url are required!' });
    }

    // Insert data ke database
    const plantId = await insertPlant({
      plant_name,
      scientific_name,
      description,
      care_instructions,
      photo_url,
      created_by,
    });

    res.status(201).json({ message: 'Plant added successfully!', plantId });
  } catch (error) {
    console.error('Error adding plant:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
