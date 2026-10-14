import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as attendancesController from "../controllers/attendances.controller.js"
import * as membersController from "../controllers/members.controller.js"
import { Router } from "express"

const router = Router();

router.put("/checkAssistance/:memberId", authMiddleware.verifyToken, attendancesController.checkAssistance);
router.get("/attendancestoday", authMiddleware.verifyToken, attendancesController.attendancesToday);
router.get("/memberstofinish/:gymId", authMiddleware.verifyToken, membersController.membersToFinish)
router.get("/getrecently/:gymId", authMiddleware.verifyToken, membersController.getMembersRecently);
router.get("/getStats/:gymId", authMiddleware.verifyToken, membersController.getStats)
router.get("/search/:gymId", authMiddleware.verifyToken, membersController.search)


export default router;