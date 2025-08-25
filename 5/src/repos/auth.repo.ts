import db from "../utils/prisma.util";

// 회원가입
export const create = async({email, hashedPassword, nickname, userId}: RegisterQueryType) => await db.user.create({
  data: {
      id: userId,
      nickname,
      email,
      password: hashedPassword,
      provider: "local",
      providerId: userId
  },
});