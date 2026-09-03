import mongoose from 'mongoose';
import connectDB from '../config/db';
import { Activity } from '../models/activity.model';
import { Package } from '../models/package.model';
import { Blog } from '../models/blog.model';
import { GuestReview } from '../models/guestReview.model';
import { activitiesSeed } from './seedData/activities.seed';
import { packagesSeed } from './seedData/packages.seed';
import { blogsSeed } from './seedData/blogs.seed';
import { guestReviewsSeed } from './seedData/guestReviews.seed';

const run = async () => {
  await connectDB();

  for (const item of activitiesSeed) {
    await Activity.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  }
  console.log(`Activities seeded: ${activitiesSeed.length}`);

  for (const item of packagesSeed) {
    await Package.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  }
  console.log(`Packages seeded: ${packagesSeed.length}`);

  for (const item of blogsSeed) {
    await Blog.findOneAndUpdate({ slug: item.slug }, item, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  }
  console.log(`Blogs seeded: ${blogsSeed.length}`);

  // No natural unique key on guest reviews — only seed if the collection is empty,
  // so re-running this script doesn't duplicate hand-entered admin reviews.
  const existingReviewCount = await GuestReview.countDocuments();
  if (existingReviewCount === 0) {
    await GuestReview.insertMany(guestReviewsSeed);
    console.log(`Guest reviews seeded: ${guestReviewsSeed.length}`);
  } else {
    console.log(`Guest reviews already present (${existingReviewCount}) — skipped`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
