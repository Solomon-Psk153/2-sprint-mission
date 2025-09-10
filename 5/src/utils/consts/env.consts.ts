import { envVerify } from "../env.util";

// BASIC
export const NODE_ENV = envVerify("NODE_ENV");
export const PORT = envVerify("PORT");

// ENCRYPT_KEY for simeple-encrypt
export const ENCRYPT_KEY = envVerify("ENCRYPT_KEY");

// SESSION
export const SESSION_SECRET = envVerify("SESSION_SECRET");

// TOKEN
export const JWT_ACCESS_TOKEN_SECRET = envVerify("JWT_ACCESS_TOKEN_SECRET");
export const JWT_REFRESH_TOKEN_SECRET = envVerify("JWT_REFRESH_TOKEN_SECRET");

// NAVER
export const NAVER_CLIENT_ID = envVerify("NAVER_CLIENT_ID");
export const NAVER_CLIENT_SECRET = envVerify("NAVER_CLIENT_SECRET");

// DISCORD
export const DISCORD_CLIENT_ID = envVerify("DISCORD_CLIENT_ID");
export const DISCORD_CLIENT_SECRET = envVerify("DISCORD_CLIENT_SECRET");

// AUTH0
// const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
// const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
// const AUTH0_SECRET = process.env.AUTH0_SECRET;
// const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL;