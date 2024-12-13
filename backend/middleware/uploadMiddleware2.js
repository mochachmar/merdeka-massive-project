import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'thumbnail_image') {
      cb(null, 'public/images'); // Simpan file di folder 'public/images'
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Gunakan nama asli file
  },
});

// File filter untuk membatasi jenis file
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG files are allowed'), false);
  }
};

// Inisialisasi Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Batas ukuran file 5 MB
}).single('thumbnail_image');

// Middleware untuk menangani upload
export const uploadMiddleware2 = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      return res.status(400).json({ msg: err.message });
    }
    next();
  });
};

export default uploadMiddleware2;
