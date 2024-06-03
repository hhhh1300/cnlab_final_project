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
  quitActivity,
  deleteActivity,
} from '@/controllers/activity.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.post('/create', createActivity);
router.post('/', joinActivity);

router.get('/', getActivityAll);
router.get('/memberID', getUserActivity);
router.get('/id', getActivityById);
router.get('/member', getActivityMember);
router.get('/capacity', getActivityCapacity);
router.get('/status', getActivityByStatus);
router.patch('/:id/status', changeActivityStatus);

router.delete('/member', quitActivity);
router.delete('/', deleteActivity);

export default router;
