/** @format */

import { Response, Request } from "express";
import { createEmailSchema } from "../schemas/index";
import { createEmail } from "../lib/index";
import { defaultSender } from "../../config/default";

const createController = async (req: Request, res: Response) => {
    try {
        // check sender existence
        if (req.body.sender === undefined) req.body.sender = defaultSender;

        // Validate the request body
        const parsedBody = createEmailSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // if (!parsedBody.data.sender) {
        //     parsedBody.data.sender = defaultSender;
        // }
        // Create the email
        const email = await createEmail(parsedBody.data);
        console.log("email created: ", email);

        return res.status(201).json({
            message: "Email created successfully",
            email,
        });
    } catch (error) {
        console.error("Error during creating email:", error);
        return res.status(500).json({ message: "Error creating email" });
    }
};

export default createController;
