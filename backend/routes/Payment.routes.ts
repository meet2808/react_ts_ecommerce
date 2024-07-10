import { Router } from "express";
import { handlePayment } from "../controllers/Payment.controllers";
import { verifyToken } from "../middleware/auth.middleware"

const router = Router();

router.route("/create-checkout-session").post(verifyToken, handlePayment);

export default router;