/** @format */

import prisma from "@schemas/prisma";
import { GenderType } from "@prisma/client";

// check if the user already exists
const getExitingPatient = async (email: string) => {
    const user = await prisma.patient.findUnique({ where: { email } });
    return user;
};

// retrive all patient
const getAllPatient = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const patients = await prisma.patient.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patients;
    } catch (error) {
        console.error("Error getting patients:", error);
        return null;
    }
};

// retrive patient by id
const findById = async (id: string) => {
    try {
        const patients = await prisma.patient.findFirst({ where: { id } });
        return patients;
    } catch (error) {
        console.error("Error getting patients:", error);
        return null;
    }
};

// delete a patient
const deleteById = async (id: string) => {
    try {
        const patient = await prisma.patient.delete({ where: { id } });
        return patient;
    } catch (error) {
        console.error("Error deleting patient:", error);
        return null;
    }
};

// create a new patient
const createPatient = async (data: {
    auth_user_id: string;
    name: string;
    email: string;
    phone?: string | undefined;
    profile_picture?: string | undefined;
    date_of_birth?: Date | undefined;
    gender?: GenderType | undefined;
    address?: string | undefined;
}) => {
    try {
        const patient = await prisma.patient.create({
            data: {
                auth_user_id: data.auth_user_id,
                name: data.name,
                email: data.email,
                phone: data.phone,
                profile_picture: data.profile_picture,
                date_of_birth: data.date_of_birth,
                gender: data.gender,
                address: data.address,
            },
            select: {
                name: true,
                email: true,
                phone: true,
                gender: true,
                date_of_birth: true,
            },
        });
        return patient;
    } catch (error) {
        console.error("Error creating patient:", error);
        return null;
    }
};

export {
    getExitingPatient,
    createPatient,
    getAllPatient,
    findById,
    deleteById,
};
