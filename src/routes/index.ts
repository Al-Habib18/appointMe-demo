/** @format */
const router = require("express").Router();
import {
    createController,
    deleteController,
    findAllByPatientIdController,
    findAllByDoctorIdController,
    findByIdcontroller,
    getAllController,
    deleteAllController,
} from "../controllers";

router.post("/appointments", createController);
router.get("/appointments", getAllController);
router.get("/appointments/:id", findByIdcontroller);
router.delete("/appointments/:id", deleteController);
router.get("/appointments/patients/:id", findAllByPatientIdController);
router.get("/appointments/doctors/:id", findAllByDoctorIdController);
router.delete("/appointments", deleteAllController);
export default router;
