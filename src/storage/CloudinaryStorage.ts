import { v2 as cloudinary } from 'cloudinary';
import config from '../config/env';
import { ImageStorage, UploadedImage } from './ImageStorage';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export class CloudinaryStorage implements ImageStorage {
  upload(file: Express.Multer.File): Promise<UploadedImage> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'forest-hideaway', resource_type: 'image' },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error('Cloudinary upload failed'));
            return;
          }
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      );
      stream.end(file.buffer);
    });
  }
}
