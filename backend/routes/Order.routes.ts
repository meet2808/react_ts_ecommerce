import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware"
import { placeOrder, getAllOrders } from "../controllers/Order.controllers";

const router = Router();

router.route("/new").post(verifyToken, placeOrder);

router.route("/:userId/all").get(verifyToken, getAllOrders)

export default router;