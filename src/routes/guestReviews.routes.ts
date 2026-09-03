import express from 'express';
import { publicList } from '../controllers/guestReview.controller';

const router = express.Router();

router.get('/', publicList);

export default router;
