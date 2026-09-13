import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as gymsController from "../controllers/gyms.controller.js"
import { Router } from "express"

const router = Router();

router.get("/getGym", authMiddleware.verifyToken, gymsController.getGymData);

router.get("/:id/getPlans", authMiddleware.verifyToken, gymsController.getPlans);
router.post("/addPlan", authMiddleware.verifyToken, gymsController.addPlan);
router.put("/editPlan/:planId", authMiddleware.verifyToken, gymsController.updatePlan);
router.delete("/deletePlan", authMiddleware.verifyToken, gymsController.deletePlan);
router.patch("/changePlanActive", authMiddleware.verifyToken, gymsController.changePlanActive);
router.get("/getPlan/:id", authMiddleware.verifyToken, gymsController.getPlan);

export default router;