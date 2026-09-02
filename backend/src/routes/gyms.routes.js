import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as gymsController from "../controllers/gyms.controller.js"
import { Router } from "express"

const router = Router();

router.get(authMiddleware.verifyToken, gymsController.getGymData)