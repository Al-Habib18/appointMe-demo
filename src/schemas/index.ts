/** @format */
import { z } from "zod";

import { emailStatus, emailSource } from "@prisma/client";

export const createEmailSchema = z.object({
    sender: z.string().email(),
    recipient: z.string().email(),
    subject: z.string(),
    body: z.string(),
    source: z.nativeEnum(emailSource).optional(),
    statue: z.nativeEnum(emailStatus).optional(),
});

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().optional(), // Optional positive integer
    page: z.number().positive().optional(), // Optional positive integer
    sortType: z.string().optional(), // Optional string
});
