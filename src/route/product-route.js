import express from "express";
import {authMiddleware} from "../middleware/auth-middleware.js";
import {validate} from "../validation/validation.js";
import productController from "../controller/product-controller.js";
import productValidation from "../validation/product-validation.js";

const productRouter = new express.Router();
productRouter.use(authMiddleware);
productRouter.route('')
    .post(validate(productValidation.createProductValidation), productController.createProduct)
    .get(validate(productValidation.listProducts), productController.listProduct);


productRouter.route('/:productId')
    .get(validate(productValidation.detailProductValidation), productController.detailProduct)
    .patch(validate(productValidation.updateProductValidation), productController.updateProductById)
    .delete(validate(productValidation.detailProductValidation), productController.deleteProductById);

export {
    productRouter
};