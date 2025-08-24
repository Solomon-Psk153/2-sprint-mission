type registerDataType = {
  email: string;
  password: string;
  nickname: string;
};

type registerQueryType = {
  email: string;
  hashedPassword: string;
  nickname: string;
  userId: string;
};