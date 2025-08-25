import Express from 'express';
import { Multer } from "multer";

declare global {
    namespace Express {
        interface User {
            id: string;
        }

        interface Request {
            user?: User;
            refreshToken?: string;
            files?: MulterFile[];
            file?: MulterFile;
        }

    }
}

// | {[fieldname: string]: MulterFile[]}