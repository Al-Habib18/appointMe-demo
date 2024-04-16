/** @format */
import prisma from "@schemas/prisma";
import { Role } from "@prisma/client";
// import { UserCreateSchema } from "@schemas/userCreate";
const getExitingUser = async (email: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
};

const createUser = async (data: {
    name: string;
    email: string;
    password: string;
    role?: Role | undefined;
}) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            verified: true,
        },
    });
    return user;
};

export { getExitingUser, createUser };
