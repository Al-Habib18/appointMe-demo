/** @format */

import dotenv from "dotenv";

dotenv.config();
export default {
    port: process.env.PORT,
    mode: "development",
    name: "logiin History Service",
};

export const defaultSender = process.env.DEFAULT_SENDER;
