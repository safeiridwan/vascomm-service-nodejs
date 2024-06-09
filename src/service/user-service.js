import {ApiError} from "../util/api-error.js";
import httpStatus from "http-status";
import {User} from "../models/user-model.js";

const detailUser = async (req, userId) => {
    if (req.user.userId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const user = await User.findOne({userId, userStatus: true});
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found.");
    }

    return user;
};

const updateUserById = async (req, userId, updateBody) => {
    if (req.user.userId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const user = await User.findOne({userId, userStatus: true});
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found.");
    }

    Object.assign(user, updateBody);
    await user.save();
    return user;
};

const deleteUserById = async (req, userId) => {
    if (req.user.userId !== userId) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const user = await User.findOne({userId, userStatus: true});
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found.");
    }

    user.userStatus = false;

    await user.save();
    return user;
};

// eslint-disable-next-line require-await
const listUser = async (filter, options) => {
    return User.paginate(filter, options);
};

export default {
    detailUser,
    updateUserById,
    deleteUserById,
    listUser
};