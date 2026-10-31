import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

const config = {
  port: process.env.PORT || 5000,
  mongodbUri: process.env.MONGODB_URI,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  backendPublicUrl: process.env.BACKEND_PUBLIC_URL || 'http://localhost:5000',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminName: process.env.ADMIN_NAME,
  adminEmail: process.env.ADMIN_EMAIL,
  contactEmail: process.env.CONTACT_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  maxUploadSizeMb: Number(process.env.MAX_UPLOAD_SIZE_MB) || 5,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  smtpHost: process.env.SMTP_HOST,
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  mailFrom: process.env.MAIL_FROM || process.env.SMTP_USER,
};

if (!config.jwtSecret && config.nodeEnv === 'production') {
  throw new Error('JWT_SECRET is required in production');
}

export default config;
