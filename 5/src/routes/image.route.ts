import express from 'express';
import passport from '../middlewares/passport';
import * as imageController from '../controllers/image.controller';
import imgUpload from '../middlewares/imageFolderCreate';

const imageRouters = express.Router();

// 이미지 하나 업로드
imageRouters.post(
    '/upload',
    passport.authenticate('accessToken', { session: false }),
    imgUpload.single('image'),
    imageController.uploadSingleImage
);

// 이미지 제공하기
imageRouters.get(
    '/:encodedEncryptedString',
    imageController.getImage
);

// 이미지 삭제
imageRouters.delete(
    '/:encodedEncryptedString',
    passport.authenticate('accessToken', { session: false }),
    imageController.imageDelete
);

export default imageRouters;