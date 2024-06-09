import authService from "../service/auth-service.js";
import {catchAsync} from "../util/catch-async.js";
import {ApiResponse} from "../util/api-response.js";
import httpStatus from "http-status";
import {SUCCESS} from "../util/constants.js";

const register = catchAsync(async (req, res) => {
    const result = await authService.register(req.body);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

const registerAdmin = catchAsync(async (req, res) => {
    const result = await authService.registerAdmin(req.body);
    res.status(200).send(new ApiResponse(httpStatus.OK, SUCCESS, result));
});

export default {
    register,
    registerAdmin
};