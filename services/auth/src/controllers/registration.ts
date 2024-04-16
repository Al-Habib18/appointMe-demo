/** @format */

import { Response, Request } from "express";
import { getExitingUser, createUser /*  generateHash  */ } from "@lib/index";
import { generateHash } from "@utils/index";
import { UserCreateSchema } from "@schemas/userCreate";
// import axios from "axios";
// import { EMAIL_SERVICE, USER_SERVICE } from "@/config";

// Type definition for user data (replace with your actual schema)

const registrationController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = UserCreateSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // Check if the user already exists
        const existingUser = await getExitingUser(parsedBody.data.email);
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await generateHash(parsedBody.data.password);

        // Create the auth user
        const user = await createUser({
            ...parsedBody.data,
            password: hashedPassword,
        });
        console.log("User created: ", user);

        // TODO: Implement user profile creation
        //TODO: Implement verification logic
        // TODO: call an mail servce to send an email

        return res.status(201).json({
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error("Error during registration:", error);
        // Handle error and return appropriate response to client
        return res.status(500).json({ message: "Error creating user" });
    }
};

export default registrationController;
