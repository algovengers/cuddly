import { Express } from 'express-serve-static-core';


declare module 'express-serve-static-core' {
    interface Request {
        user?: MiddlewareUser
    }
}
