import { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma, exclude } from "../utils/prisma";
import ApiResponse from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const generateAccessToken: (
  id: string,
  emailId: string,
  username: string
) => string = (id: string, emailId: string, username: string) => {
  return jwt.sign(
    {
      id,
      emailId,
      username,
    },
    String(process.env.JWT_SECRET_KEY),
    {
      expiresIn: "1d",
    }
  );
};
const generateRefreshToken: (id: string) => string = (id: string) => {
  return jwt.sign(
    {
      id,
    },
    String(process.env.JWT_SECRET_KEY),
    {
      expiresIn: "10d",
    }
  );
};

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { emailId, password, username } = req.body;

  if (!emailId || !password || !username) {
    throw new ApiError(401, "All feilds required");
  }

  const userExists = await prisma.user.findFirst({ where: { emailId } });

  if (userExists) {
    throw new ApiError(404, "User Already Exists");
  }

  const newUser = await prisma.user.create({
    data: { emailId, name: username, password },
  });

  return res.status(200).json(new ApiResponse(200, "user Sucessfully created"));
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { emailId, password } = req.body;
  if (!emailId || !password) {
    throw new ApiError(401, "All feilds are required");
  }

  const userExists = await prisma.user.findFirst({
    where: { emailId, password },
  });

  if (!userExists) {
    throw new ApiError(401, "Invalid email or Password");
  }

  const refreshToken = generateRefreshToken(userExists.id);
  const accessToken = generateAccessToken(
    userExists.id,
    userExists.emailId,
    userExists.name
  );

  // updateToken
  const updatedToken = prisma.user.update({
    where: { id: userExists.id },
    data: { refreshToken },
  });

  const updatedUser = await prisma.user.findFirst({
    where: { emailId },
  });

  const filteredUser = exclude(updatedUser!, ["password", "refreshToken"]);

  const options: any = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: filteredUser,
        },
        "user logged in"
      )
    );
});
const googleSingup = asyncHandler(async (req: Request, res: Response) => {
  const { data, credential } = req.body;
  const uid = data.uid;
  const emailId = data.email;
  const name = data.displayName;
  const photo = data.photoURL;
  const userExists = await prisma.user.findFirst({ where: { emailId } });
  if (userExists) {
    //return the token like others
    const refreshToken = generateRefreshToken(userExists.id);
    const accessToken = generateAccessToken(
      userExists.id,
      userExists.emailId,
      userExists.name
    );

    const options: any = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    };

    const filteredUser = exclude(userExists, ["password", "refreshToken"]);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
            user: filteredUser,
          },
          "user logged in"
        )
      );
  }

  // now we have to create the user

  const newUser = await prisma.user.create({
    data: { emailId, name },
  });
  const filteredUser = exclude(newUser, ["password", "refreshToken"]);

  const refreshToken = generateRefreshToken(newUser?.id);
  const accessToken = generateAccessToken(
    newUser.id,
    newUser.emailId,
    newUser.name
  );

  const options: any = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          accessToken,
          refreshToken,
          user: filteredUser,
        },
        "user logged in"
      )
    );
});

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: { refreshToken: null },
  });
  if (!user) {
    throw new ApiError(401, "Unauthorised Request");
  }
  console.log("hhh", user);
  const options: any = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const isAuthenticated = (req: Request, res: Response) => {
  res.status(200).json(
    new ApiResponse(200, {
      name: req.user?.name,
      emailId: req.user?.emailId,
      id: req.user?.id,
    })
  );
};

const petListing = asyncHandler(async (req: Request, res: Response) => {
  const data = await prisma.pet.findMany({
    where: {
      owner: {
        id: req.user?.id,
      },
    },
    select: {
      id: true,
      breed: true,
      Image: true,
      city: true,
      name: true,
      personality: true,
    }
  });
  return res.status(200).json({
    data,
  });
});

export { registerUser, loginUser, logoutUser, googleSingup, isAuthenticated, petListing };
