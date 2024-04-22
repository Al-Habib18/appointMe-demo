/** @format */

import { string, z } from "zod";
import {
    appointmentType,
    appointmentStatus,
    paymentMethod,
    paymentStatus,
} from "@prisma/client";

export const appointmentCreateScehma = z.object({
    patient_id: string(),
    doctor_id: string(),
    fee: z.number(),
    appointment_type: z.nativeEnum(appointmentType),
    appointment_date: z.string(),
});

export const appintmentUpdateSchema = z.object({
    appointment_type: z.nativeEnum(appointmentType).optional(),
    payment_method: z.nativeEnum(paymentMethod).optional(),
    payment_status: z.nativeEnum(paymentStatus).optional(),
    appointment_date: z.date().optional(),
});

export const appintmentStatusUpdateSchema = z.object({
    status: z.nativeEnum(appointmentStatus).optional(),
});

export const idParamSchema = z.string();

export const queryParamsSchema = z.object({
    limit: z.number().positive().optional(), // Optional positive integer
    page: z.number().positive().optional(), // Optional positive integer
    sortType: z.string().optional(), // Optional string
});
