import { ExtendedError, Server, Socket } from "socket.io";
import { DefaultSocketServerOptionType, EngineMiddleware, SocketServerType } from "../types/socket.type";
import passport from "../middlewares/passport";
import { RequestHandler, Request, Response } from "express";
import { NotFoundError } from "../utils/error/400.error";

class ScoketApp{
  private io: Server;

  constructor(){
    this.io = new Server();
    this.io.use(this.passportAuthenticate);
  }

  private passportAuthenticate(socket: Socket, next: (err?: ExtendedError) => void) {
    try {
      passport.authenticate("accessToken", { session: false });
      const user = socket.request.user;
      if(user == null){
        throw new NotFoundError("user not found");
      }
      socket.join(user.id);
      next();
    } catch (err) {
      next(err as ExtendedError);
    }
  }

  initialize(http: SocketServerType, option?: DefaultSocketServerOptionType){
    this.io.attach(http, option);
  }

  sendNotification(notification: NotificationObjType){
    const userId = notification.userId;
    this.io.to(userId.toString()).emit("notification", notification);
  }

  sendNotifications(notifications: NotificationObjType[]){
    notifications.forEach((notification: NotificationObjType) => this.io.to(notification.userId.toString()).emit("notification", notification));
  }
}

export default new ScoketApp();