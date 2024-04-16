/** @format */

const router = require("express").Router();
import {
    createController,
    // getAllController,
    // findByIdcontroller,
    // deleteController,
    // updateController,
} from "@controllers/index";

router.post("/login-histories", createController);
// router.get("/login_histories", getAllController);
// router.get("/login_histories/:id", findByIdcontroller);
// router.put("/login_histories/:id", updateController);
// router.delete("/login_histories/:id", deleteController);

export default router;
