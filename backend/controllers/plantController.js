import {
  addPlantHealthHistory,
  createPlant,
  getPlantHealthHistory,
} from "../models/plantModel.js";

// In plantController.js
export const addPlantHistory = async (req, res) => {
  try {
    const {
      plant_name,
      scientific_name,
      description,
      care_instructions,
      created_by,
    } = req.body;

    const photo_url = req.file ? req.file.path : null;

    if (!plant_name || !created_by || !photo_url) {
      return res.status(400).json({
        message: "Plant name, creator, and photo are required",
      });
    }

    const plantId = await createPlant({
      plant_name,
      scientific_name,
      description,
      care_instructions,
      photo_url,
      created_by,
    });

    res.status(201).json({
      message: "Plant added successfully",
      plantId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const savePlantHealthHistory = async (req, res) => {
  try {
    const { plant_id, disease_name, health_status, user_id } = req.body;

    const photo_url = req.file ? req.file.path : null;

    if (!plant_id || !health_status || !user_id || !photo_url) {
      return res.status(400).json({
        message: "Missing required plant health details",
      });
    }

    const healthHistoryId = await addPlantHealthHistory({
      plant_id,
      photo_url,
      disease_name,
      health_status,
      user_id,
    });

    res.status(201).json({
      message: "Plant health history saved successfully",
      healthHistoryId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getUserPlantHealthHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const healthHistory = await getPlantHealthHistory(userId);
    res.json(healthHistory);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving plant health history",
      error: error.message,
    });
  }
};
