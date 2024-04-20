/** @format */
import { Response, Request } from "express";
import { getAllAppointments } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";

const getAllController = async (req: Request, res: Response) => {
    try {
        // validate query params
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
                message: "invalid query parameter",
                errors: parsedParams.error.errors,
            });
        }

        // retrive all appointments
        const appointments = await getAllAppointments({ ...parsedParams.data });

        return res.status(200).json({ message: "success", data: appointments });
    } catch (error) {
        console.error("Error during appointment creation :", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating appintment" });
    }
};

export default getAllController;
