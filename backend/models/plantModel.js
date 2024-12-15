import { db } from '../database/db.js';

export const insertPlant = async (data) => {
  const { plant_name, scientific_name, description, care_instructions, photo_url, created_by } = data;

  const query = `
    INSERT INTO Plant (
      plant_name, scientific_name, description, care_instructions, photo_url, created_by
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [plant_name, scientific_name, description, care_instructions, photo_url, created_by];

  try {
    const [result] = await db.query(query, values); // Asumsi Anda menggunakan mysql2
    return result.insertId; // Mengembalikan ID dari record yang baru saja diinsert
  } catch (error) {
    console.error('Error inserting plant:', error);
    throw error; // Lempar error agar dapat ditangani oleh pemanggil fungsi
  }
};

export const getPlantHistory = async () => {
  const query = `
    SELECT 
      plant_id,
      plant_name,
      photo_url,
      createdAt,
      description,
      care_instructions
    FROM Plant
    ORDER BY createdAt DESC
  `;

  try {
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching plant history:', error);
    throw error;
  }
};

export const deleteAllPlants = async () => {
  const query = `DELETE FROM Plant`;
  try {
    await db.query(query);
  } catch (error) {
    console.error('Error deleting all plants:', error);
    throw error;
  }
};
