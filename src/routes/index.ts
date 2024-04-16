/** @format */

const router = require("express").Router();
import {
    createController,
    getAllController,
    findByIdController,
} from "@controllers/index";

router.post("/login-histories", createController);
router.get("/login-histories", getAllController);
router.get("/login-histories/:id", findByIdController);

export default router;
