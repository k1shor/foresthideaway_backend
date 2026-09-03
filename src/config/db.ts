import mongoose from 'mongoose';
import config from './env';

const connectDB = async (): Promise<void> => {
  try {
    if (!config.mongodbUri) {
      console.warn('MONGODB_URI is not defined in .env file. Skipping database connection.');
      return;
    }

    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
