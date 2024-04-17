/** @format */

import prisma from "../schemas/prisma";
import { emailSource, emailStatus } from "@prisma/client";
// import { notFound } from "@utils/error";

// create a new email
const createEmail = async (data: {
    sender: string;
    recipient: string;
    subject: string;
    body: string;
    source?: emailSource | undefined;
    status?: emailStatus | undefined;
}) => {
    try {
        const email = await prisma.email.create({
            data: {
                sender: data.sender,
                recipient: data.recipient,
                subject: data.subject,
                body: data.body,
                source: data.source,
                status: data.status,
            },
            select: {
                id: true,
                sender: true,
                recipient: true,
                subject: true,
                body: true,
                source: true,
                status: true,
                createdAt: true,
            },
        });
        return email;
    } catch (error) {
        console.error("Error creating login History:", error);
        return null;
    }
};

// retrive a list of emails
const getAllEmails = async (data: {
    limit?: number | undefined;
    page?: number | undefined;
    sortType?: string | undefined;
}) => {
    try {
        if (data.page === undefined) data.page = 1;
        if (data.limit === undefined) data.limit = 10;
        if (data.sortType === undefined) data.sortType = "asc";

        const emails = await prisma.email.findMany({
            skip: data.limit * (data.page - 1) || 0,
            take: data.limit || 10,
            orderBy: { id: data.sortType === "asc" ? "asc" : "desc" },
        });
        return emails;
    } catch (error) {
        console.error("Error getting doctors:", error);
        return null;
    }
};

// retrive email by id
const findById = async (id: string) => {
    try {
        const email = await prisma.email.findFirst({ where: { id } });
        return email;
    } catch (error) {
        console.error("Error getting login_history:", error);
        return null;
    }
};

export { createEmail, getAllEmails, findById };
