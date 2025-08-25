import { Server } from "socket.io";
import { Server as HttpServer } from "http";
import * as socketUtil from "../src/utils/socket.util";

export function initSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    transports: ["polling", "websocket"]
  });

  io.on("connection", (socket) => {
    console.log(`log: user connected: ${socket.id}`);

    socket.on("login", socketUtil.loginNotify);
    socket.on("disconnect", () => {
      console.log(`${socket.id}가 떠났습니다.`);
    });
  });

  return io;
}
