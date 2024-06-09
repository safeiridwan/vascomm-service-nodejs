import express from "express";
import authController from "../controller/auth-controller.js";
import {validate} from "../validation/validation.js";
import {authValidation} from "../validation/auth-validation.js";

const authRouter = new express.Router();
authRouter.post('/register', validate(authValidation.registerUserValidation), authController.register);
authRouter.post('/register/admin', validate(authValidation.registerUserValidation), authController.registerAdmin);

export {
    authRouter
};