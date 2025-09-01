import bcrypt from "bcrypt";
import * as authRepo from "../repos/auth.repo";
import * as notifyRepo from "../repos/notification.repo";
import ScoketApp from "../sockets/socket-app.socket";

// 회원가입
export const register = async ({ email, password, nickname }: RegisterDataType) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = crypto.randomUUID();
    const newUserObj = await authRepo.create({ email, hashedPassword, nickname, userId });

    const query = {
        id: crypto.randomUUID(),
        type: "register",
        message: `${userId}가 회원가입을 했습니다.`,
        userId
    };

    const notificationObj = await notifyRepo.create(query);

    ScoketApp.sendNotification(notificationObj);

    return newUserObj;
};