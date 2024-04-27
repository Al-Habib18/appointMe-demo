/** @format */

import middlewares from "../middlewares";
import { createHandler } from "./hadler";
import { Application } from "express";
import config from "../config/config.json";
import { service_urls } from "../config/default";

export const getMiddlewares = (names: string[]) => {
    return names.map((name) => middlewares[name as "auth" | "role"]);
};

export const configureRoutes = (app: Application) => {
    Object.entries(config.services).forEach(([_name, service]) => {
        // const hostname = service.url;
        const service_name = service.name as string;
        const hostname =
            service_urls[
                service_name as
                    | "auth"
                    | "login_history"
                    | "patient"
                    | "doctor"
                    | "appointment"
                    | "payment"
                    | "email"
            ];
        console.log("hostname::", hostname);
        service.routes.forEach((route) => {
            route.methods.forEach((method) => {
                const endpoint = `${route.path}`;
                const middleware = getMiddlewares(route.middlewares);
                const handler = createHandler(hostname, route.path, method);
                app[method as "get" | "post" | "put" | "delete"](
                    endpoint,
                    middleware,
                    handler
                );
            });
        });
    });
};
