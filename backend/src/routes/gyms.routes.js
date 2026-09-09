import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as gymsController from "../controllers/gyms.controller.js"
import { Router } from "express"

const router = Router();

router.get("/getGym",authMiddleware.verifyToken, gymsController.getGymData)
router.post("/addPlan", authMiddleware.verifyToken, gymsController.addPlan )

export default router;