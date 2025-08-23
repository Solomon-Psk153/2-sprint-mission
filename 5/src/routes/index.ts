import express from 'express';
import articleRouters from './article.route'
import productRouters from './product.router';
import authRouters from './auth.router';
import tagRouters from './tag.router';
import commentRouters from './comment.router';
import imagesRouters from './images.router';
import imageRouters from './image.router';
import userRouters from './user.router';

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