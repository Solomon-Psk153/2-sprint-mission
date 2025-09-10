import { Request, Response, NextFunction, RequestHandler } from "express";
import * as notificationService from "../services/notification.service";
import { BadRequestError, UnauthorizedError } from "../utils/error/400.error";
import { notificationOrderBySelector } from "../utils/orderby.util";

// 알림 목록 가져오기
export const getNotifications = async(req: Request<{}, {}, {}, Record<string, string>>, res: Response, next: NextFunction) => {
  try{
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const q = req.query;

    if (q.orderby && !["recent", "oldest"].includes(q.orderby)) {
      throw new BadRequestError("orderby must be one of: recent, oldest");
    } else if (q.offset && Object.is(Number(q.offset), NaN) === true) {
      throw new BadRequestError("offset must be number");
    } else if (q.limit && Object.is(Number(q.limit), NaN) === true) {
      throw new BadRequestError("limit must be number");
    } else if (Number(q.offset) < 0 || Number(q.limit) < 0) {
      throw new BadRequestError("offset or limit must be whole number");
    }

    const query = {
      type: q.type,
      message: q.message,
      offset: q.offset ? Number(q.offset) : 0,
      limit: q.limit ? Number(q.limit) : 10,
      orderBy: notificationOrderBySelector(q.orderby),
    };

    const notificationListObj = await notificationService.getNotifications(query);

    res.status(200).json(notificationListObj);
  } catch(err) {
    next(err);
  }
};

// 알림 읽기
export const readNotification:RequestHandler = async(req, res, next) => {
  try{
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    } 

    const notificationId = req.params.id;

    const notificationObj = await notificationService.readNotification(notificationId);

    if(notificationObj.isRead === false){
      throw new BadRequestError("conflict: notification not read");
    }

    res.status(200).json(notificationObj);
  } catch(err) {
    next(err);
  }
};

// 알림 그룹으로 읽기
export const readNotifications:RequestHandler = async(req, res, next) => {
  try{
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { ids:notificationIds }: {ids:string[]} = req.body;
    
    const notificationsObj = await notificationService.readNotifications(notificationIds);

    if(notificationsObj.every((notificationObj:NotificationObjType) => notificationObj.isRead === false) === false){
      throw new BadRequestError("conflict: notification not read");
    }

    res.status(200).json(notificationsObj);
  } catch(err) {
    next(err);
  }
};

// 알림 삭제
export const deleteNotification:RequestHandler = async(req, res, next) => {
  try{
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const notificationId = req.params.id;
    const notificationObj = notificationService.deleteNotification(notificationId);

    res.status(200).json(notificationObj);
  } catch(err) {
    next(err);
  }
};

// 알림 그룹으로 삭제
export const deleteNotifications:RequestHandler = async(req, res, next) => {
  try{
    if (req.user == null) {
      throw new UnauthorizedError("login is required");
    }

    const { ids:notificationIds }: {ids:string[]} = req.body;
    
    const notificationsObj = notificationService.deleteNotifications(notificationIds);

    res.status(200).json(notificationsObj);
  } catch(err) {
    next(err);
  }
};