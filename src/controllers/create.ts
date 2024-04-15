/** @format */

import { Response, Request } from "express";
import { getExitingDoctor, createDoctor } from "@lib/index";
import { doctorCreateSchema } from "@schemas/index";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

// Type definition for user data (replace with your actual schema)

const createController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = doctorCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // Check if the user already exists
        const existingPatient = await getExitingDoctor(parsedBody.data.email);
        if (existingPatient) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Create the auth user
        const patient = await createDoctor(parsedBody.data);
        console.log("Doctor created: ", patient);

        return res.status(201).json({
            message: "Doctor created successfully",
            patient,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default createController;
