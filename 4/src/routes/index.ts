import productRouters from './productRouters';
import authRouters from './authRouters';
import articleRouters from './articleRouters'
import express from 'express';

const router = express.Router();
router.use('/product', productRouters);
router.use('/auth', authRouters);
router.use('/article', articleRouters);

export default router;