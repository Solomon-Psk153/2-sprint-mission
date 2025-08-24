import db from "../model/prisma";

// 회원가입
export const create = async({email, hashedPassword, nickname, userId}: registerQueryType) => await db.user.create({
  data: {
      id: userId,
      nickname,
      email,
      password: hashedPassword,
      provider: "local",
      providerId: userId
  },
});