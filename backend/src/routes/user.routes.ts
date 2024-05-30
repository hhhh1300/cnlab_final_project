import { getUserName, getUserTraffic } from '@/controllers/user.controller';
import express from 'express';
import { isAuth } from '@/utils/isAuth';

const router = express.Router();

router.get('/', getUserName);
router.get('/traffic', getUserTraffic);

export default router;