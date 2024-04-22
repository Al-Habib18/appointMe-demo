/** @format */

import { Response, Request } from "express";

const updateController = async (_req: Request, res: Response) => {
    try {
        //TODO: update appoint
        return res.status(200).json({
            message: "All appointments deleted successfully",
        });
    } catch (error) {
        console.error("Error during updating Appointment:", error);
        return res
            .status(500)
            .json({ message: "Error during updating Appointment" });
    }
};

export default updateController;
