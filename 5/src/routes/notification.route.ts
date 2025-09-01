import express from 'express';
import * as notificationController from '../controllers/notification.controller';
import passport from '../middlewares/passport';

const notificationRouters = express.Router();


// 알림 목록 가져오기
notificationRouters.get(
  "/",
  passport.authenticate('accessToken', { session: false }),
  notificationController.getNotifications
);

// 알림 읽기
notificationRouters.patch(
    '/:id',
    passport.authenticate('accessToken', { session: false }),
    notificationController.readNotification
);

// 알림 그룹으로 읽기
notificationRouters.patch(
    '/',
    passport.authenticate('accessToken', { session: false }),
    notificationController.readNotifications
);

// 알림 삭제
notificationRouters.delete(
  '/:id',
  passport.authenticate('accessToken', { session: false }),
  notificationController.deleteNotification
);

// 알림 그룹으로 삭제
notificationRouters.delete(
  '/',
  passport.authenticate('accessToken', { session: false }),
  notificationController.deleteNotifications
);

export default notificationRouters;