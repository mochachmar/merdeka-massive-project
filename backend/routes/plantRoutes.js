import express from "express";
import {
  uploadPlant,
  saveDetection,
  getDetections,
} from "../controllers/plantController.js";
import uploadMiddleware from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload-tanaman", uploadMiddleware, uploadPlant);
router.post("/save-detection", saveDetection);
router.get("/detections", getDetections);

export default router;
