/** @format */
const router = require("express").Router();
import {
    creationtController,
    getAllPatientsController,
    findByIdcontroller,
    deleteController,
} from "@controllers/index";

router.post("/patients", creationtController);
router.get("/patients", getAllPatientsController);
router.get("/patients/:id", findByIdcontroller);
router.delete("/patients/:id", deleteController);

export default router;
