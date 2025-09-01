import * as notificationRepo from "../repos/notification.repo"

export const getNotifications = async({type, message, offset, limit, orderBy}: GetNotificationDataType) => {
  const notificationListObj = await notificationRepo.findAll({type, message, offset, limit, orderBy});
  return notificationListObj;
}
export const readNotification = async(notificationId: string) => {
  const notificationObj = await notificationRepo.readOne(notificationId);
  return notificationObj;
}
export const readNotifications = async(notificationIds: string[]) => {
  const notificationsObj = await notificationRepo.readMany(notificationIds);

  return notificationsObj;
}
export const deleteNotification = async(notificationId: string) => {
  const notificationObj = await notificationRepo.delere(notificationId);

  return notificationObj
}
export const deleteNotifications = async(notificationIds: string[]) => {
  const notificationsObj = await notificationRepo.delereMany(notificationIds);
}