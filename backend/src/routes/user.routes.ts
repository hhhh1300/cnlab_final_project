import {
  getUserName,
  getUserTraffic,
  getTrafficByName,
  getUserByName,
  isLogin,
  login,
  logout,
  register,
  changeUserTraffic,
  getUserById,
} from '@/controllers/user.controller';
import { isAuth } from '@/utils/isAuth';
import express from 'express';

const router = express.Router();

router.get('/', getUserName);
router.get('/traffic', getUserTraffic);
router.get('/checkuser', getTrafficByName);
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/isLogin', isAuth, isLogin);
router.get('/name', getUserByName);
router.patch('/ChangeTraffic', changeUserTraffic);
router.get('/id', getUserById);

export default router;
