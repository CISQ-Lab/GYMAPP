import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import * as cashDrawerController from "../controllers/cashDrawer.controller.js"

const router = Router();

router.get("/getCashDrawer", verifyToken, cashDrawerController.getCashDrawer);
router.put("/createCashDrawer", verifyToken, cashDrawerController.createCashDrawer)

export default router;