/** @format */
const router = require("express").Router();
import {
    registrationController,
    verifyEmailController,
    loginController,
    logoutController,
    refreshController,
} from "../controllers/index";

router.post("/register", registrationController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);

export default router;
