import { Router } from "express";
import { verifyEmail } from "../controllers/Email.controllers"

const router = Router();

router.route("/verifyUser").post(verifyEmail);

export default router;