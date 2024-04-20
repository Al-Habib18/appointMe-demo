/** @format */
import prisma from "@schemas/prisma";
// import { UserCreateSchema } from "@schemas/userCreate";
// const getExitingUser = async (email: string) => {
//     const user = await prisma.user.findUnique({ where: { email } });
//     return user;
// };

const getAllAppointments = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const appointments = await prisma.appointment.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return appointments;
    } catch (error) {
        console.log("error in getAllAppointments", error);
        return null;
    }
};

// create a new appointment
const createAppointment = async (data: {
    patient_id: string;
    doctor_id: string;
    appointment_date: Date;
}) => {
    const appintment = await prisma.appointment.create({
        data: {
            patient_id: data.patient_id,
            doctor_id: data.doctor_id,
            appointment_date: data.appointment_date,
        },
        select: {
            id: true,
            patient_id: true,
            doctor_id: true,
        },
    });
    return appintment;
};

// retrive an appointment by id
const findById = async (id: string) => {
    try {
        const appointment = await prisma.appointment.findFirst({
            where: { id },
        });
        return appointment;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

const deleteById = async (id: string) => {
    try {
        // delete the appointment
        const patient = await prisma.appointment.delete({ where: { id } });
        return patient;
    } catch (error) {
        console.error("Error deleting appointment:", error);
        return null;
    }
};

// retrive all appointment by patient id
const findAllByPatientId = async (
    id: string,
    data: {
        limit?: number | undefined;
        page?: number | undefined;
        sortType?: string | undefined;
    }
) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const patientAppointments = await prisma.appointment.findMany({
            where: { patient_id: id },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return patientAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

// retrive all appointment by patient id
const findAllByDoctorId = async (
    id: string,
    data: {
        limit?: number | undefined;
        page?: number | undefined;
        sortType?: string | undefined;
    }
) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const doctorAppointments = await prisma.appointment.findMany({
            where: { doctor_id: id },
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return doctorAppointments;
    } catch (error) {
        console.error("Error getting appointment:", error);
        return null;
    }
};

export {
    createAppointment,
    getAllAppointments,
    findById,
    deleteById,
    findAllByPatientId,
    findAllByDoctorId,
};
