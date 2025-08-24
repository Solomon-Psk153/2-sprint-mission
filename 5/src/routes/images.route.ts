import express from 'express';
import passport from '../middlewares/passport';
import * as imageController from '../controllers/image.controller';
import imgUpload from '../middlewares/imageFolderCreate';

const imagesRouters = express.Router();

// 이미지들 업로드
imagesRouters.post(
    '/upload',
    passport.authenticate('accessToken', { session: false }),
    imgUpload.array('images', 10),
    imageController.uploadImages
);

export default imagesRouters;