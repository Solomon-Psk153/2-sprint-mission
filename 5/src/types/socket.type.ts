import type { NextFunction, Request } from "express";
import type { IncomingMessage, ServerResponse } from "http";
import http from "http";

// Engine.IO 요청을 표현 (내부 프로퍼티라 공식 타입에 없으므로 보강)
export type EngineRequest = IncomingMessage & {
  _query?: Record<string, string | undefined>;
};
export type EngineResponse = ServerResponse;
export type EngineMiddleware = (req: EngineRequest, res: EngineResponse, next: NextFunction) => void;

export type SocketServerType = http.Server;

// server: SocketServerType
// server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   transports: ["polling", "websocket"]
// }
export type DefaultSocketServerOptionType = {
  cors: {
    origin: StaticOrigin | CustomOrigin | undefined;
    methods: string | string[] | undefined;
  },
  transports?: Transport[];
};

type Transport = "polling" | "websocket" | "webtransport"

type StaticOrigin = boolean | string | RegExp | Array<boolean | string | RegExp>;

type CustomOrigin = (
  requestOrigin: string | undefined,
  callback: (err: Error | null, origin?: StaticOrigin) => void,
) => void;

declare module "http" {
  interface IncomingMessage {
    user?: UserPassportType
  }
}