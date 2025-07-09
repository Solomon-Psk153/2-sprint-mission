import express from 'express';
import authController from '../controllers/auth/authController';

const authRouters = express.Router();

authRouters.post(
    '/register',
    authController.registerHandler
);

authRouters.post(
    '/login', 
    authController.loginHandler
);

export default authRouters;