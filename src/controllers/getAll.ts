/** @format */

import { Response, Request } from "express";
import { getAllPayment } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";

const getAllPaymentsController = async (req: Request, res: Response) => {
    try {
        // Validate the request params
        let { limit, page, sortType } = req.query;
        let defaultLimit;

        if (!limit) defaultLimit = 10;
        else defaultLimit = Number(limit);

        let defaultPage;
        if (!page) defaultLimit = 1;
        else defaultPage = Number(page);

        if (!sortType) sortType = "asc";
        const parsedParams = queryParamsSchema.safeParse({
            limit: defaultLimit,
            page: defaultPage,
            sortType: sortType,
        });
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsedParams.error.issues,
            });
        }

        const { data } = parsedParams;
        // retrive all patients
        const payments = await getAllPayment({ ...data });

        return res.status(201).json({
            message: "Payments retrive successfully",
            payments,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default getAllPaymentsController;
