"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ErrorMiddleware(err, req, res, next) {
    console.log("Middleware Error Hadnling");
    const statusCode = err.statusCode || 500;
    const errMsg = err.message || "Something went wrong";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: errMsg,
    });
}
exports.default = ErrorMiddleware;
