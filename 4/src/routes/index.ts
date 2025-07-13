import productRouters from './productRouters';
import authRouters from './authRouters';
import articleRouters from './articleRouters'
import express from 'express';
import tagRouters from './tagRouters';
import commentRouters from './commentRouters';

const router = express.Router();
router.use('/auth', authRouters);
router.use('/products', productRouters);
router.use('/articles', articleRouters);
router.use('/comments', commentRouters);
router.use('/tags', tagRouters);

export default router;