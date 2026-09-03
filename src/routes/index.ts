import express from 'express';
import statusRoutes from './status.routes';
import authRoutes from './auth.routes';
import uploadsRoutes from './uploads.routes';
import activitiesRoutes from './activities.routes';
import packagesRoutes from './packages.routes';
import blogsRoutes from './blogs.routes';
import guestReviewsRoutes from './guestReviews.routes';
import adminActivitiesRoutes from './admin/activities.routes';
import adminPackagesRoutes from './admin/packages.routes';
import adminBlogsRoutes from './admin/blogs.routes';
import adminGuestReviewsRoutes from './admin/guestReviews.routes';
import contactRoutes from './contact.routes';

const router = express.Router();

router.use('/status', statusRoutes);
router.use('/auth', authRoutes);
router.use('/admin/uploads', uploadsRoutes);
router.use('/contact', contactRoutes);

router.use('/activities', activitiesRoutes);
router.use('/packages', packagesRoutes);
router.use('/blogs', blogsRoutes);
router.use('/guest-reviews', guestReviewsRoutes);

router.use('/admin/activities', adminActivitiesRoutes);
router.use('/admin/packages', adminPackagesRoutes);
router.use('/admin/blogs', adminBlogsRoutes);
router.use('/admin/guest-reviews', adminGuestReviewsRoutes);

export default router;
