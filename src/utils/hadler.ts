/** @format */

import { Request, Response } from "express";

import axios from "axios";

export const buildUrl = (hostname: string, path: string, req: Request) => {
    let url = `${hostname}${path}`;
    if (req.params) {
        Object.keys(req.params).forEach((param) => {
            url = url.replace(`:${param}`, req.params[param]);
        });
    }
    return url;
};

const makeRequest = async (
    method: string,
    url: string,
    data: any,
    headers: any
) => {
    try {
        console.log("I am i make request funtion ::  ");
        console.log("url :: ", url);
        const { data: response } = await axios({
            method,
            url,
            data,
            headers,
        });
        return response;
    } catch (error) {
        if (error instanceof axios.AxiosError) {
            throw error; // Re-throw Axios errors for specific handling
        } else {
            throw new Error("Internal Server Error"); // Generic error for other cases
        }
    }
};

export const createHandler = (
    hostname: string,
    path: string,
    method: string
) => {
    return async (req: Request, res: Response) => {
        try {
            req.headers = {
                origin: "http://localhost:8080",
                "x-user-id": req.headers["x-user-id"] || "",
                "x-user-email": req.headers["x-user-email"] || "",
                "x-user-name": req.headers["x-user-name"] || "",
                "x-user-role": req.headers["x-user-role"] || "",
            };
            const url = buildUrl(hostname, path, req);
            const data = await makeRequest(method, url, req.body, req.headers);
            return res.json(data);
        } catch (error) {
            console.error(error);
            if (error instanceof axios.AxiosError) {
                return res
                    .status(error.response?.status || 500)
                    .json(error.response?.data);
            }
            return res.status(500).json({ message: "Internal Server Error" });
        }
    };
};

// Helper functions to be defined in a separate file (buildUrl.ts)
