/** @format */

import { Response, Request } from "express";
import { getPaidPaymentByAppointmentId, paymentCreate } from "@lib/index";
import { paymentCreateSchema } from "@schemas/index";

const createController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = paymentCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check previous successfull payment
        const isPaid = await getPaidPaymentByAppointmentId(
            parsedBody.data.appointment_id
        );
        if (isPaid) {
            return res
                .status(400)
                .json({ message: "appointment already paid" });
        }

        // create payment
        const payment = await paymentCreate(parsedBody.data);

        return res.status(201).json({
            message: "Patient created successfully",
            payment,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default createController;
