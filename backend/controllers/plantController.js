// controllers/plantController.js
import { insertPlant } from '../models/plantModel.js';
import { db } from '../database/db.js'; // Pastikan db diimport
import { getPlantHistory } from '../models/plantModel.js';
import { deleteAllPlants } from '../models/plantModel.js';

export const addPlantHistory = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { plant_name, scientific_name, description, care_instructions, created_by, health_status, disease_name } = req.body;

    const photo_url = req.file ? req.file.path : null;
    console.log('Photo URL:', photo_url);
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!plant_name || !created_by || !photo_url || !health_status || !disease_name) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'plant_name, created_by, photo_url, health_status, and disease_name are required!' });
    }

    await connection.beginTransaction();
    console.log('Transaction started');

    const plantId = await insertPlant({
      plant_name,
      scientific_name,
      description,
      care_instructions,
      photo_url,
      created_by,
    });
    console.log('Inserted Plant with ID:', plantId);

    await connection.commit();
    console.log('Transaction committed');

    res.status(201).json({ message: 'Plant and PlantHealthHistory added successfully!', plantId });
  } catch (error) {
    await connection.rollback();
    console.error('Error adding plant and health history:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    connection.release();
    console.log('Connection released');
  }
};

export const fetchPlantHistory = async (req, res) => {
  try {
    const plantHistory = await getPlantHistory();
    res.status(200).json(plantHistory);
  } catch (error) {
    console.error('Error fetching plant history:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const removeAllPlantHistory = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    await deleteAllPlants();
    await connection.commit();
    res.status(200).json({ message: 'Semua riwayat tanaman berhasil dihapus.' });
  } catch (error) {
    await connection.rollback();
    console.error('Error deleting all plant history:', error);
    res.status(500).json({ message: 'Gagal menghapus riwayat tanaman.', error: error.message });
  } finally {
    connection.release();
  }
};
