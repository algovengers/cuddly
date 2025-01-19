import { Router } from "express";
import upload from "../middleware/multer";
import { uploadPet } from "../controllers/pet.controller";
import { isAuthenticated, logoutUser, petListing } from "../controllers/user.controller";
import { detectImage } from "../controllers/gemini.controller";

const authRouter = Router();

authRouter.route("/upload-a-pet").post(upload.single("Image"), uploadPet);
authRouter.route("/isAuthenticated").get(isAuthenticated);
authRouter.route("/logout").post(logoutUser);
authRouter.route("/detect").post(upload.single("Image"), detectImage);
authRouter.route("/petlisting").get(petListing)
export default authRouter;
