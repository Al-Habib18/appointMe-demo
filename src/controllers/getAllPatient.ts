/** @format */

import { Response, Request } from "express";
import { getAllPatient } from "@lib/index";
import { queryParamsSchema } from "@schemas/index";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

// Type definition for user data (replace with your actual schema)

const getAllPatientsController = async (req: Request, res: Response) => {
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
        const patients = await getAllPatient({ ...data });

        return res.status(201).json({
            message: "Patient retrive successfully",
            patients,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Error creating Patient" });
    }
};

export default getAllPatientsController;
