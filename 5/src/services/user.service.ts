import * as userRepo from "../repos/user.repo";
import bcrypt from "bcrypt";

// 유저 정보 조회
export const getUserInfo = async (userId: string) => {
    const userInfoObj = await userRepo.findById(userId);
    return userInfoObj;
};

// 유저 비밀번호 수정
export const updatePassword = async ({ userId, newPassword }: UserInfoQueryType) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userRepo.updatePassword({ userId, hashedPassword });

    return { message: "success get new password!" };
};

// 유저 정보 수정
export const updateUserInfo = async function ({ userId, nickname, email }: UserInfoQueryType) {
    const updatedUserInfoObj = await userRepo.updateUserInfo({ userId, nickname, email });
    return updatedUserInfoObj;
};