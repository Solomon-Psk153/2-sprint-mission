import express from 'express';
import * as authController from '../controllers/auth.controller';
import passport from '../middlewares/passport';
import { validateEmail } from "../middlewares/validators";
import {stateValidator} from '../middlewares/passport/stateValidator';

const authRouters = express.Router();

// 로그아웃
authRouters.post(
    '/register',
    validateEmail,
    authController.register
);

// 로컬 로그인
authRouters.post(
    '/local/login',
    passport.authenticate('local', { session: false }),
    authController.login
);

// naver 로그인
authRouters.get(
    '/naver/login',
    passport.authenticate('naver', { session: false, authType: 'reprompt' })
);

authRouters.get(
    '/naver/callback',
    // stateValidator,
    passport.authenticate('naver', { session: false }),
    authController.login,
);

// discord 로그인
authRouters.get(
    '/discord/login',
    passport.authenticate('discord', { session: false })
);

authRouters.get(
    '/discord/callback',
    // stateValidator,
    passport.authenticate('discord', { session: false }),
    authController.login
);

// 로그아웃
authRouters.post(
    '/logout',
    authController.logout
);

// 토큰 재발급
authRouters.post(
    '/refresh',
    passport.authenticate('refreshToken', { session: false }),
    authController.refreshTokens
)

export default authRouters;