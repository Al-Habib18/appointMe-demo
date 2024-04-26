/** @format */

import middlewares from "../middlewares";
import { createHandler } from "./createHandler";
import { Application } from "express";
import config from "../config/config.json";

export const getMiddlewares = (names: string[]) => {
    return names.map((name) => middlewares[name]);
};

export const configureRoutes = (app: Application) => {
    Object.entries(config.services).forEach(([_name, service]) => {
        const hostname = service.url;
        service.routes.forEach((route) => {
            route.methods.forEach((method) => {
                const endpoint = `/api${route.path}`;
                const middleware = getMiddlewares(route.middlewares);
                const handler = createHandler(hostname, route.path, method);
                app[method](endpoint, middleware, handler);
            });
        });
    });
};
