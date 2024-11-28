const express = require("express");
const router = express.Router();
const { PlantDetectionHistory } = require("../models"); // Model untuk menyimpan deteksi

// Endpoint untuk menyimpan hasil deteksi ke database
router.post("/save-detection", async (req, res) => {
  const { plantId, userId, className, solution } = req.body;

  try {
    // Menyimpan data ke tabel PlantDetectionHistory
    const detection = await PlantDetectionHistory.create({
      plant_id: plantId,
      user_id: userId,
      class_name: className,
      solution: solution,
    });
    res.status(200).json({ message: "Hasil deteksi berhasil disimpan." });
  } catch (error) {
    console.error("Error saving detection:", error);
    res.status(500).json({ message: "Gagal menyimpan deteksi." });
  }
});

module.exports = router;
