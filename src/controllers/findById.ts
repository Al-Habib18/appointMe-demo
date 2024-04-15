/** @format */

import { Response, Request } from "express";
import { findById } from "@lib/index";
import { idParamSchema } from "@schemas/index";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

// Type definition for user data (replace with your actual schema)

const findByIdcontroller = async (req: Request, res: Response) => {
    try {
        //Validate the querey params
        const parsedId = idParamSchema.safeParse(req.params.id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedId.error.issues,
            });
        }
        // retrive a simgle doctor
        const doctor = await findById(parsedId.data);

        return res.status(201).json({
            message: "doctor retrive successfully",
            doctor,
        });
    } catch (error) {
        console.error("Error during retrivation:", error);
        return res.status(500).json({ message: "Error retriveing doctor" });
    }
};

export default findByIdcontroller;
