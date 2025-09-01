type NotificationDataType = {
  id: string;
  type: string;
  message: string;
  userId: string;
};

type NotificationObjType = NotificationDataType & {
  createdAt: Date;
  isRead: boolean;
}

type GetNotificationDataType = {
  type: string;
  message: string;
  userId?: string;
} & PagenationType;