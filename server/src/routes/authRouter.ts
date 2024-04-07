import { Router } from "express";
import upload from "../middleware/multer";
import { uploadPet } from "../controllers/pet.controller";

const authRouter = Router();

authRouter.route("/upload-a-pet").post(upload.single("Image"), uploadPet);

export default authRouter;