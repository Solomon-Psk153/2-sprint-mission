import Express from 'express';

declare global {
    namespace Express {
        interface User {
            id: string
        }

        interface Request {
            user?: User;
            refreshToken?: string;
        }
    }

    type addrType = AddressInfo | string | null;
    type portType = string | number | boolean;
}