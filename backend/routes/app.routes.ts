import { Router} from "express";
import userRoutes from "./User.routes";
import cartRoutes from "./Cart.routes";
import paymentRoutes from "./Payment.routes"
import orderRoutes from "./Order.routes"
import emailRoutes from "./Email.routes"
import stateRoutes from "./States.routes"

const router = Router();

router.use("/users", userRoutes);

router.use("/cart", cartRoutes);

router.use("/payment", paymentRoutes);

router.use("/order", orderRoutes)

router.use("/email", emailRoutes)

router.use("/list", stateRoutes)

export default router;