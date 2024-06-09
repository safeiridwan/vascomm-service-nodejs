import express from "express";
import {healthCheckRouter} from "./health-check-route.js";

export const router = express.Router();

const defaultRoutes = [
    {
        path: '/health-check',
        route: healthCheckRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});