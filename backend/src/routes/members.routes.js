import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as attendancesController from "../controllers/attendances.controller.js"
import { Router } from "express"

const router = Router();

router.put("/checkAssistance/:memberId", authMiddleware.verifyToken, attendancesController.checkAssistance);


export default router;