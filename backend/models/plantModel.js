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
