import { getUserById, isLogin, login, logout, register } from '@/controllers/user.controller';
import { isAuth } from '@/utils/isAuth';
import express from 'express';

const router = express.Router();

router.post('/login', login);

router.post('/logout', logout);

router.post('/register', register);

router.get('/isLogin', isAuth, isLogin);

router.get('/id', getUserById);

export default router;
