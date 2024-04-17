import { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";

export const loggerMiddleware: Middleware =
    (store: MiddlewareAPI) => (next) => (action) => {
        // console.log("store: ", store);
        // console.log("next: ", next);
        // console.log("action: ", action);
        next(action);
    };
