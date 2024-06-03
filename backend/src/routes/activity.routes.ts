import {
  getActivityAll,
  getUserActivity,
  getActivityById,
  getActivityByStatus,
  joinActivity,
  createActivity,
  getActivityMember,
  getActivityCapacity,
  changeActivityStatus,
} from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.post('/', createActivity);
router.post('/', joinActivity);

router.get('/', getActivityAll);
router.get('/memberID', getUserActivity);
router.get('/id', getActivityById);
router.get('/member', getActivityMember);
router.get('/capacity', getActivityCapacity);
router.get('/status', getActivityByStatus);
router.patch('/:id/status', changeActivityStatus);

export default router;
