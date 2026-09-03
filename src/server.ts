import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config/env';
import connectDB from './config/db';
import routes from './routes';
import { notFound } from './middleware/notFound.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static: uploaded images
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api', routes);

// 404 Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
});
