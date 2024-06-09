import {ApiError} from "../util/api-error.js";
import httpStatus from "http-status";
import {User} from "../models/user-model.js";
import {ADMIN_ROLE} from "../util/constants.js";
import {v4 as uuid} from "uuid";

const register = async (requestPayload) => {
    const {email} = requestPayload;
    const user = await User.findOne({email});
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.");
    }

    let newUser = Object.assign({}, requestPayload)
    newUser.userId = uuid().toString();

    return User.create(newUser);
};

const registerAdmin = async (requestPayload) => {
    const {email} = requestPayload;
    const user = await User.findOne({email});
    if (user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already exists.");
    }

    let newUser = Object.assign({}, requestPayload)
    newUser.userId = uuid().toString();
    newUser.role = ADMIN_ROLE;

    return User.create(newUser);
};

export default {
    register,
    registerAdmin
};