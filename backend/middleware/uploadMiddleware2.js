import multer from 'multer';
import path from 'path';

// Menyimpan file dengan konfigurasi diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tentukan lokasi penyimpanan file
    if (file.fieldname === 'thumbnail_image') {
      cb(null, 'public/images'); // Simpan file di folder 'public/images'
    }
  },
  filename: (req, file, cb) => {
    // Menyimpan file dengan nama asli
    cb(null, file.originalname); // Gunakan nama file asli
    // Atau jika ingin nama kustom, misalnya:
    // const customName = `thumbnail_${file.originalname}`;
    // cb(null, customName); // Gunakan nama file kustom
  },
});

// Filter untuk tipe file yang diperbolehkan
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'thumbnail_image') {
    // Pastikan hanya file JPEG atau PNG yang diizinkan
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg or .png images are allowed'), false);
    }
  }
};

// Konfigurasi multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Maksimal ukuran file 5MB
  },
});

// Middleware untuk menangani file upload
const uploadMiddleware2 = (req, res, next) => {
  upload.fields([{ name: 'thumbnail_image', maxCount: 1 }])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error('Multer Error:', err);
      return res.status(400).json({ msg: err.message });
    } else if (err) {
      console.error('File Upload Error:', err);
      return res.status(400).json({ msg: err.message });
    }
    console.log('Uploaded Files:', req.files);
    next();
  });
};

export default uploadMiddleware2;
