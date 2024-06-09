import {ApiResponse} from "../util/api-response.js";
import httpStatus from "http-status";
import {SUCCESS} from "../util/constants.js";
import {catchAsync} from "../util/catch-async.js";
import {pick} from "../util/pick.js";
import productService from "../service/product-service.js";

const createProduct = catchAsync(async (req, res) => {
    const result = await productService.createProduct(req, req.body);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const detailProduct = catchAsync(async (req, res) => {
    const result = await productService.detailProduct(req, req.params.productId);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const updateProductById = catchAsync(async (req, res) => {
    const result = await productService.updateProductById(req, req.params.productId, req.body);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const deleteProductById = catchAsync(async (req, res) => {
    const result = await productService.deleteProductById(req, req.params.productId);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const listProduct = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['search']);
    const options = pick(req.query, ['sortBy', 'take', 'skip']);
    const result = await productService.listProduct(filter, options);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

export default {
    createProduct,
    detailProduct,
    updateProductById,
    deleteProductById,
    listProduct,
};