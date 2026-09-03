import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import config from '../config/env';
import { ImageStorage, UploadedImage } from './ImageStorage';

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

export class LocalDiskStorage implements ImageStorage {
  async upload(file: Express.Multer.File): Promise<UploadedImage> {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const ext = path.extname(file.originalname);
    const filename = `${crypto.randomUUID()}${ext}`;
    const destPath = path.join(UPLOADS_DIR, filename);

    await fs.promises.writeFile(destPath, file.buffer);

    return {
      url: `${config.backendPublicUrl}/uploads/${filename}`,
    };
  }
}
