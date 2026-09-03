import jwt, { SignOptions } from 'jsonwebtoken';
import config from '../config/env';

export interface JwtPayload {
  sub: string;
  role: string;
  email: string;
}

export const signToken = (payload: JwtPayload): string => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  } as SignOptions);
};

export const verifyToken = (token: string): JwtPayload => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.verify(token, config.jwtSecret) as JwtPayload;
};
