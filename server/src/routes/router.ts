import {
  googleSingup,
  loginUser,
  registerUser,
} from "../controllers/user.controller";
// import { chatWithAi } from "controllers/chat.controller";
import { clearcache, explorePets, getPet } from "../controllers/pet.controller";
import { Router } from "express";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/signinwithgoogle").post(googleSingup);
router.route("/explore").get(explorePets);
router.route("/pet/:id").get(getPet);
router.route("/clearcache").get(clearcache);

export default router;
