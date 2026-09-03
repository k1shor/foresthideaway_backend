import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import storage from '../storage';

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ApiError(400, 'No image file provided');
  }

  const result = await storage.upload(req.file);
  res.status(201).json({ success: true, data: result });
});
