"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statuscode, message = "Something went wrong", error = [], stack = "") {
        super(message);
        this.statusCode = statuscode;
        this.message = message;
        this.error = error;
        this.data = null;
        this.success = false;
        if (stack.length > 0) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map