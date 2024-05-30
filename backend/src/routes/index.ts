import express from 'express';

// import UserRoutes from './user.routes';
import ActivityRoutes from './activity.routes';
import UserRoutes from './user.routes';
import TransactionRoutes from './transaction.routes';

const router = express.Router();

router.use('/user', UserRoutes);
router.use('/activity', ActivityRoutes);
router.use('/transaction', TransactionRoutes)


export default router;
