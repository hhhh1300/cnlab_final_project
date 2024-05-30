import { getUserName, getUserTraffic, getUserById, isLogin, login, logout, register } from '@/controllers/user.controller';
import { isAuth } from '@/utils/isAuth';
import express from 'express';

const router = express.Router();

router.get('/', getUserName);
router.get('/traffic', getUserTraffic);
router.post('/login', login);
router.post('/logout', logout);
router.post('/register', register);
router.get('/isLogin', isAuth, isLogin);
router.get('/id', getUserById);

export default router;