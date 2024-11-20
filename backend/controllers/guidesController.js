import Guides from "../models/guidesModels.js";
import path from "path";

// Mengambil semua data guides
export const getGuides = async (req, res) => {
  try {
    const response = await Guides.findAll({
      attributes: [
        "guide_id",
        "title",
        "thumbnail_image",
        "short_description",
        "long_description",
        "tips_and_tricks",
        "pdf_file",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error retrieving data" });
  }
};

// Mengambil data guide berdasarkan guide_id
export const getGuidesById = async (req, res) => {
  try {
    const response = await Guides.findOne({
      where: { guide_id: req.params.id },
      attributes: [
        "guide_id",
        "title",
        "thumbnail_image",
        "short_description",
        "long_description",
        "tips_and_tricks",
        "pdf_file",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!response) {
      return res.status(404).json({ msg: "Guide not found" });
    }
    res.json(response);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error retrieving data" });
  }
};

// Menyimpan data guide baru
export const saveGuides = async (req, res) => {
  if (!req.files || !req.files.thumbnail_image) {
    return res.status(400).json({ msg: "No File Uploaded" });
  }

  const {
    title,
    short_description,
    long_description,
    tips_and_tricks,
    status,
  } = req.body;

  if (!title || !short_description || !status) {
    return res
      .status(400)
      .json({ msg: "Title, short description, and status are required" });
  }

  const file = Array.isArray(req.files.thumbnail_image)
    ? req.files.thumbnail_image[0]
    : req.files.thumbnail_image;

  const fileSize = file.size;
  const ext = path.extname(file.originalname);
  const fileName = file.originalname;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "Invalid Image Type" });
  }

  if (fileSize > 5000000) {
    // 5MB limit
    return res.status(422).json({ msg: "Image must be less than 5MB" });
  }

  let pdfFileName = null;
  if (req.files.pdf_file) {
    const pdfFile = Array.isArray(req.files.pdf_file)
      ? req.files.pdf_file[0]
      : req.files.pdf_file;
    const pdfFileSize = pdfFile.size;
    const pdfExt = path.extname(pdfFile.originalname);
    pdfFileName = pdfFile.originalname;

    const allowedPdfType = [".pdf"];
    if (!allowedPdfType.includes(pdfExt.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid PDF Type" });
    }
    if (pdfFileSize > 10000000) {
      // 10MB limit
      return res.status(422).json({ msg: "PDF must be less than 10MB" });
    }
  }

  try {
    await Guides.create({
      title,
      thumbnail_image: fileName,
      short_description,
      long_description,
      tips_and_tricks,
      pdf_file: pdfFileName,
      status,
    });

    res.status(201).json({ msg: "Guide Created Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error saving data" });
  }
};

// Fungsi untuk update guide
export const updateGuides = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    short_description,
    long_description,
    tips_and_tricks,
    status,
  } = req.body;

  try {
    const guide = await Guides.findOne({ where: { guide_id: id } });

    if (!guide) {
      return res.status(404).json({ msg: "Guide not found" });
    }

    let fileName = guide.thumbnail_image;

    if (req.files && req.files.thumbnail_image) {
      const file = Array.isArray(req.files.thumbnail_image)
        ? req.files.thumbnail_image[0]
        : req.files.thumbnail_image;

      const fileSize = file.size;
      const ext = path.extname(file.originalname);
      const allowedType = [".png", ".jpg", ".jpeg"];

      if (!allowedType.includes(ext.toLowerCase())) {
        return res.status(422).json({ msg: "Invalid Image Type" });
      }

      if (fileSize > 5000000) {
        // 5MB limit
        return res.status(422).json({ msg: "Image must be less than 5MB" });
      }

      fileName = file.originalname;
    }

    const updatedGuide = await guide.update({
      title: title || guide.title,
      short_description: short_description || guide.short_description,
      long_description: long_description || guide.long_description,
      tips_and_tricks: tips_and_tricks || guide.tips_and_tricks,
      status: status || guide.status,
      thumbnail_image: fileName,
    });

    if (updatedGuide[0] === 0) {
      return res.status(200).json({ msg: "No changes made" });
    }

    res.status(200).json({ msg: "Guide updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error updating guide" });
  }
};

// Fungsi untuk delete guide
export const deleteGuides = async (req, res) => {
  const { id } = req.params;

  try {
    const guide = await Guides.findOne({ where: { guide_id: id } });

    if (!guide) {
      return res.status(404).json({ msg: "Guide not found" });
    }

    await guide.destroy();
    res.status(200).json({ msg: "Guide deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Error deleting guide" });
  }
};
