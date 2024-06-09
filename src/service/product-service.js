import {ApiError} from "../util/api-error.js";
import httpStatus from "http-status";
import {ADMIN_ROLE} from "../util/constants.js";
import {Product} from "../models/product-model.js";
import {v4 as uuid} from "uuid";

const createProduct = async (req, createBody) => {
    if (req.user.role !== ADMIN_ROLE) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const product = {productId : uuid().toString()};
    Object.assign(product, createBody);

    return Product.create(product);
};

const detailProduct = async (req, productId) => {
    const product = await Product.findOne({productId, productStatus: true});
    if (!product) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Product not found.");
    }

    return product;
};

const updateProductById = async (req, productId, updateBody) => {
    if (req.user.role !== ADMIN_ROLE) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const product = await Product.findOne({productId, productStatus: true});
    if (!product) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Product not found.");
    }

    Object.assign(product, updateBody);
    await product.save();
    return product;
};

const deleteProductById = async (req, productId) => {
    if (req.user.role !== ADMIN_ROLE) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const product = await Product.findOne({productId, productStatus: true});
    if (!product) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Product not found.");
    }

    product.productStatus = false;

    await product.save();
    return product;
};

// eslint-disable-next-line require-await
const listProduct = async (filter, options) => {
    if (filter.search) {
        filter = {
            $or: [
                { 'productName': { $regex: '.*' + filter.search + '.*' } },
            ],
            productStatus : true
        }
    } else {
        filter = {productStatus : true};
    }
    return Product.paginate(filter, options);
};

export default {
    createProduct,
    detailProduct,
    updateProductById,
    deleteProductById,
    listProduct
};