import bcrypt from "bcrypt";
import * as authRepo from "../repos/auth.repo";

// 회원가입
export const register = async ({email, password, nickname}: RegisterDataType) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userId = crypto.randomUUID();
    const newUserObj = await authRepo.create({email, hashedPassword, nickname, userId});

    return newUserObj;
};