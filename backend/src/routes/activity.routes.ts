import { getActivityAll, createActivity } from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.post('/', createActivity);
router.get('/', getActivityAll);

export default router;
