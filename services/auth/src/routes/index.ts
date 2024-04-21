/** @format */
const router = require("express").Router();
import {
    registrationController,
    verifyEmailController,
    loginController,
    logoutController,
} from "../controllers";

router.post("/register", registrationController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.post("/logout", logoutController);

export default router;
