import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as attendancesController from "../controllers/attendances.controller.js"
import { Router } from "express"

const router = Router();

router.put("/checkAssistance/:memberId", authMiddleware.verifyToken, attendancesController.checkAssistance);
router.get("/attendancestoday", authMiddleware.verifyToken, attendancesController.attendancesToday);


export default router;