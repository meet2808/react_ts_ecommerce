import { Router } from "express";
import { addUpdateCart, getCartItems, deleteItemFromCart } from "../controllers/Cart.controllers";
import { verifyToken } from "../middleware/auth.middleware"

const router = Router();

router.route("/add-update").post(verifyToken, addUpdateCart);

router.route("/items").get(verifyToken, getCartItems);

router.route("/delete/:id").delete(verifyToken, deleteItemFromCart);

export default router;