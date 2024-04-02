import { NextFunction, Request, Response } from "express";

export default function ErrorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("Middleware Error Hadnling");
  const statusCode = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errMsg,
  });
}
