import * as authMiddleware from "../middlewares/auth.middleware.js"
import * as productsController from "../controllers/products.controller.js"
import { Router } from "express"

const router = Router();

router.get("/getProducts/:gymId", authMiddleware.verifyToken, productsController.getProducts)
router.get("/getStats/:gymId", authMiddleware.verifyToken, productsController.getStats);
router.get("/search/:gymId", authMiddleware.verifyToken, productsController.search);
export default router;