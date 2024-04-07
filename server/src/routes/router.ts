import {
  googleSingup,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/signinwithgoogle").post(googleSingup);

export default router;
