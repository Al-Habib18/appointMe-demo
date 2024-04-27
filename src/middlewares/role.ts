/** @format */

import { Request, Response, NextFunction } from "express";

export const role = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers["authorization"]) {
        res.status(401).json({ message: "Unauthorized" });
    }

    try {
        next();
    } catch (error) {
        console.log("[auth middleware]", error);
        res.status(401).json({ message: "Unauthorized" });
    }
};
