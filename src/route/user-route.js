import express from "express";
import {authMiddleware} from "../middleware/auth-middleware.js";
import userValidation from "../validation/user-validation.js";
import {validate} from "../validation/validation.js";
import userController from "../controller/user-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
userRouter.route('')
    .get(validate(userValidation.listUsers), userController.listUser);
userRouter.route('/:userId')
    .get(validate(userValidation.detailUserValidation), userController.detailUser)
    .patch(validate(userValidation.updateUserValidation), userController.updateUserById)
    .delete(validate(userValidation.detailUserValidation), userController.deleteUserById);

export {
    userRouter
};