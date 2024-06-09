import Joi from "joi";

const createProductValidation = {
    body: Joi.object()
        .keys({
            productName: Joi.string().max(100).required(),
            price: Joi.number().required(),
        })
        .min(1),
};

const detailProductValidation = {
    params: Joi.object().keys({
        productId: Joi.string().max(100).required(),
    }),
};

const updateProductValidation = {
    params: Joi.object().keys({
        productId: Joi.string().max(100).required(),
    }),
    body: Joi.object()
        .keys({
            productName: Joi.string().max(100).required(),
            price: Joi.number().required(),
        })
        .min(1),
};

const listProducts = {
    query: Joi.object().keys({
        search: Joi.string().allow('', null).optional(),
        sortBy: Joi.string(),
        take: Joi.number().integer(),
        skip: Joi.number().integer(),
    }),
};

export default {
    createProductValidation,
    detailProductValidation,
    updateProductValidation,
    listProducts
};