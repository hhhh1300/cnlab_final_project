import { postTransaction } from '@/controllers/transaction.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.post('/', postTransaction);

export default router;