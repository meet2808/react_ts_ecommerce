import { Router} from "express";
import userRoutes from "./User.routes";
import cartRoutes from "./Cart.routes"

const router = Router();

router.use("/users", userRoutes);

router.use("/cart", cartRoutes);

export default router;