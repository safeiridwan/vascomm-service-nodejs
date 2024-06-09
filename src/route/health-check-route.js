import express from "express";
import healthController from "../controller/health-controller.js";

const healthCheckRouter = new express.Router();
healthCheckRouter.get('', healthController.ping);

export {
    healthCheckRouter
};