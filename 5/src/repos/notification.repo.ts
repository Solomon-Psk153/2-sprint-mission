import db from "../utils/prisma.util";

export const create = async({type, message, userId}: NotificationDataType) => await db.notification.create({
  data:{
    id: crypto.randomUUID(),
    type,
    message,
    userId
  }
}); 