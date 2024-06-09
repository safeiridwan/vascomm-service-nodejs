import Joi from "joi";

const detailUserValidation = {
    params: Joi.object().keys({
        userId: Joi.string().max(100).required(),
    }),
};

const updateUserValidation = {
    params: Joi.object().keys({
        userId: Joi.string().max(100).required(),
    }),
    body: Joi.object()
        .keys({
            firstName: Joi.string().max(100).required(),
            lastName: Joi.string().max(100).required(),
        })
        .min(1),
};

const listUsers = {
    query: Joi.object().keys({
        search: Joi.string(),
        sortBy: Joi.string(),
        take: Joi.number().integer(),
        skip: Joi.number().integer(),
    }),
};

export default {
    detailUserValidation,
    updateUserValidation,
    listUsers
};