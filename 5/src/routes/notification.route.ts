import express from 'express';
import * as notificationController from '../controllers/notification.controller';

const notificationRouters = express.Router();


// 알림 목록 가져오기
notificationRouters.get(
  "/",
  notificationController.getNotifications
);

// 알림 읽기
notificationRouters.patch(
    '/:id',
    notificationController.readNotification
);

// 알림 그룹으로 읽기
notificationRouters.patch(
    '/',
    notificationController.readNotifications
);

// 알림 삭제
notificationRouters.delete(
  '/:id',
  notificationController.deleteNotification
);

// 알림 그룹으로 삭제
notificationRouters.delete(
  '/',
  notificationController.deleteNotifications
);

export default notificationRouters;