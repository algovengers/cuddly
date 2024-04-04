"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const user_controller_1 = require("../controllers/user.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.route("/signup").post(user_controller_1.registerUser);
router.route("/login").post(user_controller_1.loginUser);
router.route("/logout").post(user_controller_1.logoutUser);
router.route("/signinwithgoogle").post(user_controller_1.googleSingup);
//# sourceMappingURL=router.js.map