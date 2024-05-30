import express from 'express';
import { isAuth } from '@/utils/isAuth';
import { getMessagesByActivity, sendMessage } from '@/controllers/message.controller';

const router = express.Router();

router.use('/id', getMessagesByActivity);
router.use('/', sendMessage);

export default router;
