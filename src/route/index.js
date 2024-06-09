import express from "express";
import {healthCheckRouter} from "./health-check-route.js";
import {authRouter} from "./auth-route.js";

export const router = express.Router();

const defaultRoutes = [
    {
        path: '/health-check',
        route: healthCheckRouter,
    },
    {
        path: '/auth',
        route: authRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});