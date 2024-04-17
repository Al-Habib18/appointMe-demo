/** @format */

const router = require("express").Router();
import {
    createController,
    getAllController,
    findByIdController,
} from "../controllers/index";

router.post("/emails", createController);
router.get("/emails", getAllController);
router.get("/emails/:id", findByIdController);

export default router;
