/** @format */

import prisma from "@schemas/prisma";
import { LoginAttempt } from "@prisma/client";
// import { notFound } from "@utils/error";

const createLoginHistory = async (data: {
    auth_user_id: string;
    ip_address: string;
    user_agent: string;
    attempt?: LoginAttempt | undefined;
}) => {
    try {
        const login_history = await prisma.history.create({
            data: {
                auth_user_id: data.auth_user_id,
                ip_address: data.ip_address,
                user_agent: data.user_agent,
                attempt: data.attempt,
            },
            select: {
                auth_user_id: true,
                ip_address: true,
                user_agent: true,
                attempt: true,
                loginAt: true,
            },
        });
        return login_history;
    } catch (error) {
        console.error("Error creating login History:", error);
        return null;
    }
};

export { createLoginHistory };
