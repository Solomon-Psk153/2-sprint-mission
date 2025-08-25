import express from 'express';
import * as userController from '../controllers/user.controller';
import passport from '../middlewares/passport';
import { validateEmail } from "../middlewares/validators";

const userRouters = express.Router();

// 유저 정보 조회
userRouters.get(
    '/info',
    passport.authenticate('accessToken', { session: false }),
    userController.getUserInfo
);

// 유저 상품 목록 조회
userRouters.get(
    '/info/products',
    passport.authenticate('accessToken', { session: false }),
    userController.getUserProductList
);

// 유저 비밀번호 수정
userRouters.patch(
    'info/password/update',
    passport.authenticate('accessToken', { session: false }),
    userController.updatePassword
);

// 유저 정보 수정
userRouters.patch(
    '/info/update',
    passport.authenticate('accessToken', { session: false }),
    validateEmail,
    userController.updateUserInfo
);

export default userRouters;