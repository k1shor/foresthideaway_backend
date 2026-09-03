import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from '../config/env';
import connectDB from '../config/db';
import { User } from '../models/user.model';

const run = async () => {
  if (!config.adminEmail || !config.adminPassword || !config.adminName) {
    throw new Error('ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD must be set in .env');
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(config.adminPassword, 10);

  const user = await User.findOneAndUpdate(
    { email: config.adminEmail.toLowerCase() },
    { name: config.adminName, email: config.adminEmail.toLowerCase(), passwordHash, role: 'admin' },
    { upsert: true, returnDocument: 'after' }
  );

  console.log(`Admin user ready: ${user.email}`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
