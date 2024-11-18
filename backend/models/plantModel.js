import { db } from "../database/db.js";
export const insertPlantHistory = async (data) => {
    const { plant_name, photo_url, disease_name, health_status, user_id, detected_at } = data;
  
    const query = `
      INSERT INTO PlantHealthHistory (plant_name, photo_url, disease_name, health_status, user_id, detected_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
  
    const values = [plant_name, photo_url, disease_name, health_status, user_id, detected_at];

    const [result] = await db.query(query, values);
    return result.insertId; 
  };
  