/** @format */

import { Response, Request } from "express";
import { paymentCreateSchema } from "@schemas/index";
import { getGatewayPageURL } from "@lib/sslCommerz";
import { getPaymentByAppointmentId } from "@lib/index";

const createController = async (req: Request, res: Response) => {
    try {
        const parsedBody = paymentCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        //TODO: retrive appointment fee from appointment service
        const amount = 500;

        const payment = await getPaymentByAppointmentId(
            parsedBody.data.appointment_id
        );
        if (payment) {
            return res
                .status(400)
                .json({ message: "Appointment already Paid" });
        }

        //init payment
        const tran_id = parsedBody.data.appointment_id;
        const gatewayPageURL = await getGatewayPageURL(tran_id, amount);

        return res.status(201).json({
            message: "gatewayPageURL created  successfully",
            gatewayPageURL,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default createController;
