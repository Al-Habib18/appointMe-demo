/** @format */

import { Request, Response, NextFunction } from "express";
import { EmailVerificationSchema } from "@schemas/index";
import {
    getExitingUser,
    getVerificationCode,
    updateVerificationCode,
    updateUser,
} from "@lib/index";
import { sendToQueue } from "@utils/index";
// import { EMAIL_SERVICE } from "@/config";

const verifyEmailController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, code } = req.body;
        console.log("EmaiL : ", email);
        console.log("code:", code);
        // Validate the request body
        const parsedBody = EmailVerificationSchema.safeParse({ email, code });
        if (!parsedBody.success) {
            return res.status(400).json({ errors: parsedBody.error.errors });
        }

        // check if the user with email exists
        const user = await getExitingUser(parsedBody.data.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // find the verification code
        const verificationCode = await getVerificationCode(
            user.id,
            parsedBody.data.code
        );
        if (!verificationCode) {
            return res
                .status(404)
                .json({ message: "Invalid verification code" });
        }

        // if the code has expired
        if (verificationCode.expiresAt < new Date()) {
            return res
                .status(400)
                .json({ message: "Verification code expired" });
        }

        // update user status to verified
        await updateUser(user.id);
        // update verification code status to used
        await updateVerificationCode(verificationCode.id);

        // send success email
        sendToQueue("verification", "create mail option");

        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return next(error);
    }
};

export default verifyEmailController;
