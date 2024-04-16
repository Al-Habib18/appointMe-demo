/** @format */

import { z } from "zod";
import { Role } from "@prisma/client";

export const UserCreateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
    name: z.string().min(3).max(255),
    role: z.nativeEnum(Role).optional(),
});
