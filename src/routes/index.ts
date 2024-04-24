/** @format */

import {
    createController,
    getAllPaymentsController,
    findByIdController,
} from "@controllers/index";

/** @format */
const router = require("express").Router();

router.post("/payments", createController);
router.get("/payments", getAllPaymentsController);
router.get("/payments/:id", findByIdController);

export default router;
