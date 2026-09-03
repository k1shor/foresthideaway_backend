import express from 'express';
import { uploadImage } from '../controllers/upload.controller';
import { protect, authorize } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage);

export default router;
