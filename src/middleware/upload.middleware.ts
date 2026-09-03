import multer from 'multer';
import config from '../config/env';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: config.maxUploadSizeMb * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'));
      return;
    }
    cb(null, true);
  },
});
