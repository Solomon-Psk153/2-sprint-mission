import dotenv from 'dotenv';
import { InternalServerError } from "./error/500.error";
dotenv.config();

export const envVerify = (value: string) => {
    const env = process.env[value];
    if(env == null) {
        console.log(value);
        throw new InternalServerError(`env not found`);
    }
    return env;
}