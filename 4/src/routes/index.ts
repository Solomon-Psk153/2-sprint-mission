import productRouter from './productRouters';
import authRouters from './authRouters';
import express from 'express';

const router = express.Router();
router.use('/product', productRouter);
router.use('/auth', authRouters);

export default router;