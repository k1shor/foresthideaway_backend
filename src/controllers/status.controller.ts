import { Request, Response } from 'express';

export const getStatus = (req: Request, res: Response): void => {
  res.status(200).json({
    status: 'success',
    message: 'Backend server is running correctly (TypeScript)!',
    timestamp: new Date().toISOString(),
  });
};
