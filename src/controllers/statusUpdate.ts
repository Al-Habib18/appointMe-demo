/** @format */

import { updateStatus } from "@lib/index";
import { idParamSchema, appintmentStatusUpdateSchema } from "@schemas/index";
import { Response, Request } from "express";

const updateController = async (req: Request, res: Response) => {
    try {
        //TODO: update appoint
        const { id } = req.params;
        const parsedId = idParamSchema.safeParse(id);
        if (!parsedId.success) {
            return res.status(400).json({
                message: "invalid query parameter",
                errors: parsedId.error.errors,
            });
        }

        // //validate the request body\
        const { appointment_status } = req.body;
        console.log("appointment_status :: ", appointment_status);
        const paresedBody =
            appintmentStatusUpdateSchema.safeParse(appointment_status);
        if (!paresedBody.success) {
            return res.status(400).json({
                message: "invalid request body",
                errors: paresedBody.error.errors,
            });
        }

        // update the appointment
        const appintmentStatus = await updateStatus(
            parsedId.data,
            paresedBody.data
        );

        return res.status(200).json({
            message: "All appointments updated successfully",
            appintmentStatus,
        });
    } catch (error) {
        console.error("Error during updating Appointment:", error);
        return res
            .status(500)
            .json({ message: "Error during updating Appointment" });
    }
};

export default updateController;
