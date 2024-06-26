import {ApiError} from "../util/api-error.js";
import httpStatus from "http-status";
import {User} from "../models/user-model.js";
import {logger} from "../application/logging.js";
import {ADMIN_ROLE} from "../util/constants.js";

const detailUser = async (req, userId) => {
    if (req.user.userId !== userId && req.user.role !== ADMIN_ROLE) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }

    const user = await User.findOne({userId, userStatus: true});
    if (!user) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found.");
    }

    return user;
};

const updateUserById = async (req, userId, updateBody) => {
    if (req.user.userId !== userId && req.user.role !== ADMIN_ROLE) {
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
    if (req.user.userId !== userId && req.user.role !== ADMIN_ROLE) {
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
const listUser = async (req, filter, options) => {
    if (req.user.role !== ADMIN_ROLE) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden.");
    }
    logger.info(filter.search);
    if (filter.search) {
        logger.info("MASUK SINI");
        filter = {
            $or: [
                { 'firstName': { $regex: '.*' + filter.search + '.*' } },
                { 'lastName':  { $regex: '.*' + filter.search + '.*' } },
            ],
            userStatus: true
        }
    } else {
        filter = {userStatus : true};
    }
    return User.paginate(filter, options);
};

export default {
    detailUser,
    updateUserById,
    deleteUserById,
    listUser
};