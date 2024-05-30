import {
  getActivityAll,
  getActivityById,
  joinActivity,
  createActivity,
  getActivityMember,
  getActivityCapacity,
} from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.post('/', createActivity);
router.post('/', joinActivity);

router.get('/', getActivityAll);
router.get('/id', getActivityById);
router.get('/member', getActivityMember);
router.get('/capacity', getActivityCapacity);

export default router;
