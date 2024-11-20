import multer from 'multer';
import path from 'path';

// Konfigurasi tempat penyimpanan
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder tempat file disimpan
    if (file.mimetype === 'application/pdf') {
      cb(null, './public/pdf/');
    } else {
      cb(null, './public/images/');
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nama file unik
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type'), false);
  }
  cb(null, true);
};

// Middleware multer
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
});

const uploadMiddleware = (req, res, next) => {
  upload.fields([
    { name: 'thumbnail_image', maxCount: 1 },
    { name: 'pdf_file', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ msg: err.message });
      } else {
        return res.status(400).json({ msg: 'Invalid file type or size' });
      }
    }
    next();
  });
};

export const singleUpload = upload.single('thumbnail_image');
export const multipleUpload = upload.fields([{ name: 'thumbnail_image', maxCount: 1 }]);
export default uploadMiddleware;
