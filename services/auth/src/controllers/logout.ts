/** @format */

import { Response, Request } from "express";
import { refreshTokenSchema } from "@schemas/index";
import { decodeUser, deleteRefreshToken } from "@lib/index";

const logoutController = async (req: Request, res: Response) => {
    try {
        // Validate the request body
        const parsedBody = refreshTokenSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        //get decoded user
        const decodedUser = decodeUser(parsedBody.data.refreshToken);
        if (decodedUser == null) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate refresh token
        const deletedToken = await deleteRefreshToken(
            parsedBody.data.refreshToken
        );
        if (!deletedToken) {
            return res.status(400).json({ message: "Token not found" });
        }

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        console.log("error :: ", error);
        return res.status(500).json({ message: "Error logging in user" });
    }
};

export default logoutController;
