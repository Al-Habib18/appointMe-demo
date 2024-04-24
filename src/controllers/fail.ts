/** @format */

import { Response, Request } from "express";

const failController = async (req: Request, res: Response) => {
    try {
        //TODO: send email to user

        return res.status(201).json({
            message: "Patient created failed.please try again later",
            appointment: req.body.tran_id,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default failController;
