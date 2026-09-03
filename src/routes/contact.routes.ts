import express from 'express';
import { sendEnquiry, subscribeNewsletter } from '../controllers/contact.controller';

const router = express.Router();

router.post('/', sendEnquiry);
router.post('/newsletter', subscribeNewsletter);

export default router;
