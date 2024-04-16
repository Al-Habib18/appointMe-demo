/** @format */
import { z } from "zod";

import { LoginAttempt } from "@prisma/client";

export const createLoginHistorySchema = z.object({
    auth_user_id: z.string(),
    ip_address: z.string(),
    user_agent: z.string(),
    attempt: z.nativeEnum(LoginAttempt).optional(),
});
