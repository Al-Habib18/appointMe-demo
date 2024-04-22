/** @format */

import { createEmail } from "../lib";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "mailhog",
    port: parseInt(process.env.SMTP_PORT || "1025"),
});

interface EmailOption {
    from: string;
    to: string;
    subject: string;
    text: string;
}

export const sendAuthMail = async (emailOption: EmailOption) => {
    const { rejected } = await transporter.sendMail(emailOption);
    let email;
    if (rejected.length) {
        email = await createEmail({
            from: emailOption.from,
            to: emailOption.to,
            subject: emailOption.subject,
            text: emailOption.text,
            status: "failed",
        });
        console.log("Email rejected: ", rejected);
    } else {
        email = await createEmail({
            from: emailOption.from,
            to: emailOption.to,
            subject: emailOption.subject,
            text: emailOption.text,
            status: "success",
        });
        console.log("email created successfull");
    }
    return email;
};
