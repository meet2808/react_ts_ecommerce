import { Router } from "express";
import { body } from "express-validator";
import { signUp, login, addShippingDetails } from "../controllers/User.controllers";
import { verifyToken } from "../middleware/auth.middleware";

const router = Router();

router.route("/signup").post([
    body("email", "Please enter valid email address").isEmail(),
    body("password").isLength({ min: 6, max: 20 }).withMessage("Password length must be between  6 and 20 character long")
], signUp);

router.route("/login").post(login);

router.route("/add-shipping-details").post(verifyToken, addShippingDetails);

export default router;