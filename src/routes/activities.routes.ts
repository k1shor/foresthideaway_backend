import express from 'express';
import { publicList, publicGet } from '../controllers/activity.controller';

const router = express.Router();

router.get('/', publicList);
router.get('/:slug', publicGet);

export default router;
