import db from "../utils/prisma.util";

// 알림 목록 가져오기
export const findAll = async ({ type, message, offset, limit, orderBy }: GetNotificationDataType) => await db.notification.findMany({
  where: {
    type,
    message: message ? {
      contains: message,
      mode: "insensitive"
    } : undefined,
  },

  orderBy,

  skip: offset,
  take: limit
});

// 알림 생성
export const create = async (data: NotificationDataType) => await db.notification.create({ data });

// 알림 한번에 생성
export const createMany = async (datas: NotificationDataType[]) => await db.notification.createManyAndReturn({
  data: datas,
  skipDuplicates: true
});

// 알림 읽기
export const readOne = async (id: string) => await db.notification.update({
  where: { id },
  data: { isRead: true }
});

// 알림 한번에 읽기
export const readMany = async (ids: string[]) => await db.notification.updateManyAndReturn({
  where: {
    id: {
      in: ids
    }
  },
  data: { isRead: true }
});

// 알림 삭제
export const delere = async (id: string) => await db.notification.delete({ where: { id } });

// 알림 한번에 삭제
export const delereMany = async (ids: string[]) => await db.notification.deleteMany({
  where: {
    id: {
      in: ids
    }
  }
});