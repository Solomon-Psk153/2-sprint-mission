type RegisterDataType = {
  email: string;
  password: string;
  nickname: string;
};

type RegisterQueryType = {
  email: string;
  hashedPassword: string;
  nickname: string;
  userId: string;
};