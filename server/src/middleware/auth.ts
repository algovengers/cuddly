import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { exclude, prisma } from "../utils/prisma";

type User = {
  id : string;
  name : string;
  emailId : string;
  password : string;
  refreshToken : string;
  photo : string;
}

const authenticateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken =
      req.cookies?.accessToken ??
      req.headers["authorization"]?.replace("Bearer ", "");
    console.log(accessToken)
    if (!accessToken) {
      throw new ApiError(401, "Unauthorized request");
    }
    // console.log(String(process.env.JWT_SECRET_KEY))
    const decodedToken = jwt.verify(
      String(accessToken),
      String(process.env.JWT_SECRET_KEY),
    ) as JwtPayload;
    console.log(decodedToken)
    const user = await prisma.user.findFirst({
      where: { id: decodedToken?.id },
    }) as User;
    if (!user) {
      throw new ApiError(401, "Unauthorized request");
    }

    const fileredUser : MiddlewareUser = exclude(user, ["password", "refreshToken"]);
    req.user = fileredUser;
    next();
  }
);

export {authenticateUser}