/** @format */

import { Request, Response } from "express";

import axios from "axios";

export const createHandler = (
    hostname: string,
    path: string,
    method: string
) => {
    return async (req: Request, res: Response) => {
        try {
            let url = `${hostname}${path}`;
            req.params &&
                Object.keys(req.params).forEach((param) => {
                    url = url.replace(`:${param}`, req.params[param]);
                });

            const { data } = await axios({
                method,
                url,
                data: req.body,
                headers: {
                    origin: "http://localhost:8081",
                    "x-user-id": req.headers["x-user-id"] || "",
                    "x-user-email": req.headers["x-user-email"] || "",
                    "x-user-name": req.headers["x-user-name"] || "",
                    "x-user-role": req.headers["x-user-role"] || "",
                    "user-agent": req.headers["user-agent"],
                },
            });

            return res.json(data);
        } catch (error) {
            console.log(error);
            if (error instanceof axios.AxiosError) {
                return res
                    .status(error.response?.status || 500)
                    .json(error.response?.data);
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
