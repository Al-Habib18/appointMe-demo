/** @format */

import { Response, Request } from "express";
import { UserLoginSchema } from "@schemas/index";
import { getExitingUser, createRefresh } from "@lib/index";
import { hasMatched } from "@utils/index";

/* type LoginHistory = {
    userId: string;
    userAgent: string | undefined;
    ipAddress: string | undefined;
    attempt: LoginAttempt;
};

const createLoginHistory = async (data: LoginHistory) => {
    
} */

const loginController = async (req: Request, res: Response) => {
    try {
        // const ipAddress =
        //     (req.headers["x-forwarded-for"] as string) || req.ip || "";
        // const userAgent = req.headers["user-agent"] || "";

        // Validate the request body
        const parsedBody = UserLoginSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user exists
        const user = await getExitingUser(parsedBody.data.email);
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // compare password
        const isMatch = hasMatched(parsedBody.data.password, user.password);

        if (!isMatch) {
            //TODO: await createLoginHistory({
        }

        // check if the user is verified
        if (!user.verified) {
            //TODO: await createLoginHistory
        }

        // check if the account is active
        if (user.status !== "ACTIVE") {
            //TODO: await createLoginHistory
        }

        // generate refresh token
        const refreshToken = await createRefresh({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        });

        //TODO: Create login History with attemp = "succes"

        return res.status(200).json({
            message: "Login successful",
            refreshToken,
        });
    } catch (error) {
        console.log("error :: ", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export default loginController;
