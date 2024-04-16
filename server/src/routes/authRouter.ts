import { Router } from "express";
import upload from "../middleware/multer";
import { uploadPet } from "../controllers/pet.controller";
import { isAuthenticated, logoutUser } from "../controllers/user.controller";

const authRouter = Router();

authRouter.route("/upload-a-pet").post(upload.single("Image"), uploadPet);
authRouter.route("/isAuthenticated").get(isAuthenticated);
authRouter.route("/logout").post(logoutUser);

export default authRouter;
