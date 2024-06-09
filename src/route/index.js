import express from "express";
import {healthCheckRouter} from "./health-check-route.js";
import {authRouter} from "./auth-route.js";
import {userRouter} from "./user-route.js";
import {productRouter} from "./product-route.js";

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
    {
        path: '/user',
        route: userRouter,
    },
    {
        path: '/product',
        route: productRouter,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});