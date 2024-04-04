"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSingup = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
const prisma_1 = require("../utils/prisma");
const ApiResponse_1 = __importDefault(require("../utils/ApiResponse"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (id, emailId, username) => {
    return jsonwebtoken_1.default.sign({
        id,
        emailId,
        username,
    }, String(process.env.JWT_KEY_SECRET), {
        expiresIn: "1d",
    });
};
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({
        id,
    }, String(process.env.JWT_KEY_SECRET), {
        expiresIn: "10d",
    });
};
const registerUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailId, password, username } = req.body;
    if (!emailId || !password || !username) {
        throw new ApiError_1.ApiError(401, "All feilds required");
    }
    const userExists = yield prisma_1.prisma.user.findFirst({ where: { emailId } });
    if (userExists) {
        throw new ApiError_1.ApiError(404, "User Already Exists");
    }
    const newUser = yield prisma_1.prisma.user.create({
        data: { emailId, name: username, password },
    });
    return res.status(200).json(new ApiResponse_1.default(200, "user Sucessfully created"));
}));
exports.registerUser = registerUser;
const loginUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
        throw new ApiError_1.ApiError(401, "All feilds are required");
    }
    const userExists = yield prisma_1.prisma.user.findFirst({
        where: { emailId, password },
    });
    if (!userExists) {
        throw new ApiError_1.ApiError(401, "Invalid email or Password");
    }
    const refreshToken = generateRefreshToken(userExists.id);
    const accessToken = generateAccessToken(userExists.id, userExists.emailId, userExists.name);
    // updateToken
    const updatedToken = prisma_1.prisma.user.update({
        where: { id: userExists.id },
        data: { refreshToken },
    });
    const updatedUser = yield prisma_1.prisma.user.findFirst({
        where: { emailId },
    });
    const filteredUser = (0, prisma_1.exclude)(updatedUser, ["password", "refreshToken"]);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse_1.default(200, {
        accessToken,
        refreshToken,
        user: filteredUser,
    }, "user logged in"));
}));
exports.loginUser = loginUser;
const googleSingup = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, credential } = req.body;
    const uid = data.uid;
    const emailId = data.email;
    const name = data.displayName;
    const photo = data.photoURL;
    console.log(uid, emailId, name, photo);
    const userExists = yield prisma_1.prisma.user.findFirst({ where: { emailId } });
    if (userExists) {
        //return the token like others
        const refreshToken = generateRefreshToken(userExists.id);
        const accessToken = generateAccessToken(userExists.id, userExists.emailId, userExists.name);
        const options = {
            httpOnly: true,
            secure: true,
        };
        const filteredUser = (0, prisma_1.exclude)(userExists, ["password", "refreshToken"]);
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse_1.default(200, {
            accessToken,
            refreshToken,
            user: filteredUser,
        }, "user logged in"));
    }
    // now we have to create the user
    const newUser = yield prisma_1.prisma.user.create({
        data: { emailId, name },
    });
    const filteredUser = (0, prisma_1.exclude)(newUser, ["password", "refreshToken"]);
    const refreshToken = generateRefreshToken(newUser === null || newUser === void 0 ? void 0 : newUser.id);
    const accessToken = generateAccessToken(newUser.id, newUser.emailId, newUser.name);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse_1.default(200, {
        accessToken,
        refreshToken,
        user: filteredUser,
    }, "user logged in"));
}));
exports.googleSingup = googleSingup;
const logoutUser = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.prisma.user.update({
        where: { id: req.user.id },
        data: { refreshToken: null },
    });
    if (!user) {
        throw new ApiError_1.ApiError(401, "Unauthorised Request");
    }
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse_1.default(200, {}, "User logged Out"));
}));
exports.logoutUser = logoutUser;
//# sourceMappingURL=user.controller.js.map