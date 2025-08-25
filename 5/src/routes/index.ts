import express from 'express';
import articleRouters from './article.route'
import productRouters from './product.route';
import authRouters from './auth.route';
import tagRouters from './tag.router';
import commentRouters from './comment.route';
import imagesRouters from './images.route';
import imageRouters from './image.route';
import userRouters from './user.route';

const router = express.Router();
router.use('/auth', authRouters);
router.use('/products', productRouters);
router.use('/articles', articleRouters);
router.use('/comments', commentRouters);
router.use('/tags', tagRouters);
router.use('/images', imagesRouters);
router.use('/image', imageRouters);
router.use('/user', userRouters);

export default router;