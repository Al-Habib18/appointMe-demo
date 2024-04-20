/** @format */

import { Response, Request } from "express";
import { createAppointment } from "@lib/index";
import { appointmentCreateScehma } from "@schemas/index";
// import axios from "axios";
// import { patient_service_url } from "@config/default";

// Type definition for user data (replace with your actual schema)

const createController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = appointmentCreateScehma.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }
        //TODO: retrive doctorname and email
        //TODO: retrive patient name and email
        // Create the auth user
        const appintment = await createAppointment({
            patient_id: parsedBody.data.patient_id,
            doctor_id: parsedBody.data.doctor_id,
            appointment_date: new Date(parsedBody.data.appointment_date),
        });
        console.log("appintment created: ", appintment);

        // TODO: Implement user profile creation
        // if (user.role === "PATIENT") {
        //     // create the patient profile by patient the user service
        //     await axios.post(`${patient_service_url}/patients`, {
        //         auth_user_id: user.id,
        //         name: user.name,
        //         email: user.email,
        //     });
        // }
        //TODO: Implement verification logic
        // TODO: call an mail servce to send an email

        return res.status(201).json({
            message: "Appointment created successfully",
            appintment,
        });
    } catch (error) {
        console.error("Error during appointment creation :", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating appintment" });
    }
};

export default createController;
