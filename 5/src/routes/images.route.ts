import express from 'express';
import passport from '../middlewares/passport';
import imageController from '../controllers/image/imageController';
import imgUpload from '../middlewares/imageFolderCreate';

const imagesRouters = express.Router();

// 이미지들 업로드
imagesRouters.post(
    '/upload',
    passport.authenticate('accessToken', { session: false }),
    imgUpload.array('images', 10),
    imageController.uploadImagesHanlder
);

export default imagesRouters;