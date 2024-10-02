import express from 'express'
import userRouter from './user'
import healthRouter from './health'
import lobbyRouter from './lobby'

const router = express.Router();

router.use('/user', userRouter);
router.use('/lobby', lobbyRouter);
router.use('/health', healthRouter);

export default router;