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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiError_1 = require("utils/ApiError");
const asyncHandler_1 = require("utils/asyncHandler");
const prisma_1 = require("utils/prisma");
const authenticateUser = (0, asyncHandler_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const accessToken = (_b = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) !== null && _b !== void 0 ? _b : req.headers["authorization"].replace("Bearer ", "");
    if (!accessToken) {
        throw new ApiError_1.ApiError(401, "Unauthorized request");
    }
    const decodedToken = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET_KEY);
    const user = yield prisma_1.prisma.user.findFirst({
        where: { id: decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id },
    });
    if (!user) {
        throw new ApiError_1.ApiError(401, "Unauthorized request");
    }
    const fileredUser = (0, prisma_1.exclude)(user, ["password", "refreshToken"]);
    req.user = fileredUser;
    next();
}));
//# sourceMappingURL=auth.js.map