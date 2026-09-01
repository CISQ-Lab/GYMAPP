import { Router } from "express";
import * as authController from "../controllers/auth.controller.js"
import { uploadGymLogo } from "../middlewares/upload.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/createNewGym", verifyToken, uploadGymLogo.single("gymLogo"), authController.createNewGym);

export default router;