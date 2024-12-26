import { Router } from "express";
import { verifyEmail, forgotPassword } from "../controllers/Email.controllers"

const router = Router();

router.route("/verifyUser").post(verifyEmail);

router.route("/forgotPassword").post(forgotPassword);

export default router;