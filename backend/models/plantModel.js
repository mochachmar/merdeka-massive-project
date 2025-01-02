// models/plantModel.js
import { db } from '../database/db.js';

export const insertPlant = async (data) => {
  const { plant_name, scientific_name, description, care_instructions, photo_url, created_by, health_status, disease_name } = data;

  const query = `
    INSERT INTO Plant (
      plant_name, scientific_name, description, care_instructions, photo_url, created_by, health_status, disease_name
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [plant_name, scientific_name, description, care_instructions, photo_url, created_by, health_status, disease_name];

  try {
    const [result] = await db.query(query, values); // Asumsi Anda menggunakan mysql2
    return result.insertId; // Mengembalikan ID dari record yang baru saja diinsert
  } catch (error) {
    console.error('Error inserting plant:', error);
    throw error; // Lempar error agar dapat ditangani oleh pemanggil fungsi
  }
};

export const getPlantHistory = async (userId) => {
  const query = `
    SELECT 
      plant_id,
      plant_name,
      photo_url,
      createdAt,
      description,
      care_instructions,
      health_status,
      disease_name
    FROM Plant
    WHERE created_by = ?
    ORDER BY createdAt DESC
  `;

  try {
    const [rows] = await db.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error('Error fetching plant history:', error);
    throw error;
  }
};

export const deleteAllPlants = async (userId) => {
  const query = `DELETE FROM Plant WHERE created_by = ?`;
  try {
    await db.query(query, [userId]);
  } catch (error) {
    console.error('Error deleting all plants:', error);
    throw error;
  }
};
