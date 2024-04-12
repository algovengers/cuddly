import { Router } from "express";
import upload from "../middleware/multer";
import { uploadPet } from "../controllers/pet.controller";
import { isAuthenticated } from "../controllers/user.controller";

const authRouter = Router();

authRouter.route("/upload-a-pet").post(upload.single("Image"), uploadPet);
authRouter.route("/isAuthenticated").get(isAuthenticated);

export default authRouter;
