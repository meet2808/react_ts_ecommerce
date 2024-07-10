import { Router} from "express";
import userRoutes from "./User.routes";
import cartRoutes from "./Cart.routes";
import paymentRoutes from "./Payment.routes"
import orderRoutes from "./Order.routes"

const router = Router();

router.use("/users", userRoutes);

router.use("/cart", cartRoutes);

router.use("/payment", paymentRoutes);

router.use("/order", orderRoutes)

export default router;