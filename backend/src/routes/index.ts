import express from 'express';

// import UserRoutes from './user.routes';
import ActivityRoutes from './activity.routes';
import UserRoutes from './user.routes';
import MessageRoutes from './message.routes';

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/activity', ActivityRoutes);
router.use('/message', MessageRoutes);

export default router;
