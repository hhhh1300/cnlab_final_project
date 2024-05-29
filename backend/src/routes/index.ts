import express from 'express';

// import UserRoutes from './user.routes';
import ActivityRoutes from './activity.routes';
import UserRoutes from './user.routes';

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/activity', ActivityRoutes);

export default router;
