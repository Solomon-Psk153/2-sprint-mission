import express from 'express';
import authController from '../controllers/auth/authController';
import passport from '../lib/middlewares/passport';
import {validateEmail} from "../lib/middlewares/validators";

const authRouters = express.Router();

authRouters.post(
    '/register',
    validateEmail,
    authController.registerHandler
);

authRouters.post(
    '/login',
    passport.authenticate('local', { session: false }),
    authController.loginHandler
);

authRouters.post(
    '/logout',
    authController.logoutHandler
);

authRouters.post(
    '/refresh',
    passport.authenticate('refreshToken', { session: false }),
    authController.refreshTokensHandler
)

export default authRouters;