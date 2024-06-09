import Joi from "joi";

const registerUserValidation = {
    body: Joi.object().keys({
        password: Joi.string().max(100).required(),
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string(),
        email: Joi.string().max(100).email().required(),
    }),
};

const loginUserValidation = {
    body: Joi.object().keys({
        email: Joi.string().max(100).required(),
        password: Joi.string().max(100).required(),
    }),
};


export const authValidation = {
    registerUserValidation,
    loginUserValidation
};