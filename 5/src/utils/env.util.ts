import dotenv from 'dotenv';
import { InternalServerError } from './error/500.error';
dotenv.config();

const envVerify = (env: string | undefined) => {
    if(env == null) throw new InternalServerError("env not found");
    return env;
}

// BASIC
const NODE_ENV = envVerify(process.env.NODE_ENV);
//process.env.NODE_ENV || 'development';
const PORT = envVerify(process.env.PORT);
//process.env.PORT || 3000;

const BASE_URL = envVerify(process.env.BASE_URL);

// ENCRYPT_KEY
const ENCRYPT_KEY = envVerify(process.env.ENCRYPT_KEY);

// TOKEN
const JWT_ACCESS_TOKEN_SECRET = envVerify(process.env.JWT_ACCESS_TOKEN_SECRET);
const JWT_REFRESH_TOKEN_SECRET = envVerify(process.env.JWT_REFRESH_TOKEN_SECRET);

// NAVER
const NAVER_CLIENT_ID = envVerify(process.env.NAVER_CLIENT_ID);
const NAVER_CLIENT_SECRET = envVerify(process.env.NAVER_CLIENT_SECRET);

// DISCORD
const DISCORD_CLIENT_ID = envVerify(process.env.DISCORD_CLIENT_ID);
const DISCORD_CLIENT_SECRET = envVerify(process.env.DISCORD_CLIENT_SECRET);

// AUTH0
// const AUTH0_ISSUER_BASE_URL = process.env.AUTH0_ISSUER_BASE_URL;
// const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
// const AUTH0_SECRET = process.env.AUTH0_SECRET;
// const AUTH0_BASE_URL = process.env.AUTH0_BASE_URL;

export {
    NODE_ENV,
    PORT,

    ENCRYPT_KEY,
    BASE_URL,

    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET,

    NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET,

    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET

    // AUTH0_ISSUER_BASE_URL,
    // AUTH0_CLIENT_ID,
    // AUTH0_SECRET,
    // AUTH0_BASE_URL,
};