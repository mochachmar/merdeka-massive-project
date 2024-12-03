import { query } from "../database/db.js";

export const addPlantHealthHistory = async (data) => {
  const { plant_id, photo_url, disease_name, health_status, user_id } = data;

  const sql = `
    INSERT INTO PlantHealthHistory (
      plant_id, 
      photo_url, 
      disease_name, 
      health_status, 
      user_id
    ) VALUES (?, ?, ?, ?, ?)
  `;

  const values = [plant_id, photo_url, disease_name, health_status, user_id];

  try {
    const result = await query(sql, values);
    return result.insertId;
  } catch (error) {
    console.error("Error adding plant health history:", error);
    throw error;
  }
};

export const createPlant = async (data) => {
  const {
    plant_name,
    scientific_name,
    description,
    care_instructions,
    photo_url,
    created_by,
  } = data;

  const sql = `
    INSERT INTO Plant (
      plant_name, 
      scientific_name, 
      description, 
      care_instructions, 
      photo_url, 
      created_by
    ) VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    plant_name,
    scientific_name,
    description,
    care_instructions,
    photo_url,
    created_by,
  ];

  try {
    const result = await query(sql, values);
    return result.insertId;
  } catch (error) {
    console.error("Error creating plant:", error);
    throw error;
  }
};

export const getPlantHealthHistory = async (userId) => {
  const sql = `
    SELECT 
      ph.health_id,
      p.plant_name,
      ph.photo_url,
      ph.disease_name,
      ph.health_status,
      ph.detected_at
    FROM PlantHealthHistory ph
    JOIN Plant p ON ph.plant_id = p.plant_id
    WHERE ph.user_id = ?
    ORDER BY ph.detected_at DESC
  `;

  try {
    return await query(sql, [userId]);
  } catch (error) {
    console.error("Error retrieving plant health history:", error);
    throw error;
  }
};
