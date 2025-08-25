import type { Socket } from "socket.io";

export function loginNotify(this: Socket, userId: string) {
  const socket = this;
  const userRoom = `user:${userId}`;

  console.log(`log: ${userRoom}가 로그인했습니다.`);
  socket.join(userRoom);
  socket.to(userRoom).emit("login", {message: `${userRoom}가 로그인했습니다.`});
};

export function disconnectNotify(this: Socket, userId: string){
  const socket = this;
  const userRoom = `user:${userId}`;

  console.log(`log: ${userRoom}의 연결이 끊겼습니다.`);
};

