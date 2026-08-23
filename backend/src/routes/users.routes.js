import { json, Router } from "express";
import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as userController from "../controllers/users.controller.js"

const router = Router();

router.get("/me", authMiddleware.verifyToken, userController.getUserData);

export default router;