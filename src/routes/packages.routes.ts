import express from 'express';
import { publicList, publicGet } from '../controllers/package.controller';

const router = express.Router();

router.get('/', publicList);
router.get('/:slug', publicGet);

export default router;
