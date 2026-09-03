import 'multer';

export interface UploadedImage {
  url: string;
  publicId?: string;
}

export interface ImageStorage {
  upload(file: Express.Multer.File): Promise<UploadedImage>;
}
