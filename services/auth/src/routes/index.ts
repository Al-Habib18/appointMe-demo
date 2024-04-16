/** @format */
const router = require("express").Router();
import { registrationController } from "../controllers";

router.post("/register", registrationController);

export default router;
