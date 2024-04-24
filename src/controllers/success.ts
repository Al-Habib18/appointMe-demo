/** @format */

import { Response, Request } from "express";
import { paymentCreate } from "@lib/index";
const successController = async (req: Request, res: Response) => {
    try {
        const { tran_id, amount, store_amount, card_type } = req.body;

        const data = {
            appointment_id: tran_id,
            transaction_id: tran_id,
            amount: parseFloat(amount),
            store_amount: parseFloat(store_amount),
            card_type: card_type,
        };

        // create payment
        const payment = await paymentCreate(data);
        console.log("payment successful :: ", payment);

        //TODO: send email to user

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

export default successController;
