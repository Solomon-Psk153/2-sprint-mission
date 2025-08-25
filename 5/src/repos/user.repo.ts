import db from "../model/prisma";

// 유저 정보 조회
export const findById = async (userId: string) => await db.user.findUniqueOrThrow({
  where: {
    id: userId
  },

  select: {
    nickname: true,
    email: true,
    imageUrl: true
  }
});

// 유저 비밀번호 수정
export const updatePassword = async ({ userId, hashedPassword }: UserInfoType) => await db.user.update({
  where: {
    id: userId
  },

  data: {
    password: hashedPassword
  }
});

// 유저 정보 수정
export const updateUserInfo = async ({ userId, nickname, email }: UserInfoType) => await db.user.update({
  where: {
    id: userId
  },

  data: {
    nickname,
    email
  },

  select: {
    nickname: true,
    email: true
  }
});