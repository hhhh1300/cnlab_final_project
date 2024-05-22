import { getActivityAll } from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.get('/', getActivityAll);

export default router;
