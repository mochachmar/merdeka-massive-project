import express from "express";
import {
  uploadPlant,
  savePlantHealthHistory,
  singleUpload,
  getUserPlantHealthHistory,
} from "../controllers/plantController.js";
import { singleUpload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload-image", singleUpload, (req, res) => {
  if (req.file) {
    res.json({
      message: "Image uploaded successfully",
      filePath: req.file.path,
    });
  } else {
    res.status(400).json({ message: "Upload failed" });
  }
});

router.post("/upload-plant", singleUpload, uploadPlant);
router.post("/save-plant-health-history", singleUpload, savePlantHealthHistory);
router.get("/plant-health-history/:userId", getUserPlantHealthHistory);

export default router;
