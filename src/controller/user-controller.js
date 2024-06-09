import {ApiResponse} from "../util/api-response.js";
import httpStatus from "http-status";
import {SUCCESS} from "../util/constants.js";
import {catchAsync} from "../util/catch-async.js";
import userService from "../service/user-service.js";
import {pick} from "../util/pick.js";

const detailUser = catchAsync(async (req, res) => {
    const result = await userService.detailUser(req, req.params.userId);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const updateUserById = catchAsync(async (req, res) => {
    const result = await userService.updateUserById(req, req.params.userId, req.body);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const deleteUserById = catchAsync(async (req, res) => {
    const result = await userService.deleteUserById(req, req.params.userId);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const listUser = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['email']);
    const options = pick(req.query, ['sortBy', 'take', 'skip']);
    const result = await userService.listUser(filter, options);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

export default {
    detailUser,
    updateUserById,
    deleteUserById,
    listUser,
};