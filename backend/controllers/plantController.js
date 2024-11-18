import { insertPlantHistory } from '../models/plantModel.js';

export const addPlantHistory = async (req, res) => {
  try {
    const { plant_name, disease_name, health_status, user_id } = req.body;
    const photo_url = req.file.path;

    // Validasi input
    if (!plant_name || !photo_url || !health_status || !user_id) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    // Convert the current date ke MySQL DATETIME format (YYYY-MM-DD HH:MM:SS)
    const detected_at = new Date().toISOString().replace('T', ' ').replace('Z', '');
    // Insert ke database
    const healthId = await insertPlantHistory({
      plant_name,
      photo_url,
      disease_name,
      health_status,
      user_id,
      detected_at,  
    });

    res.status(201).json({ message: 'Plant history added successfully!', healthId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
