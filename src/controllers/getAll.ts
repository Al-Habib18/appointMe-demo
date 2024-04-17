/** @format */

import { Response, Request } from "express";
import { queryParamsSchema } from "../schemas/index";
import { getAllEmails } from "../lib";

const getAllController = async (req: Request, res: Response) => {
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
        // retrive all emailis
        const emails = await getAllEmails({ ...data });

        return res.status(201).json({
            message: "emails retrive successful",
            emails,
        });
    } catch (error) {
        console.error("Error during retriving emails:", error);
        return res
            .status(500)
            .json({ message: "Error during retriving emails" });
    }
};

export default getAllController;
