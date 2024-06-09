import passport from "passport";
import httpStatus from "http-status";
import {ApiError} from "../util/api-error.js";

// eslint-disable-next-line require-await
const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    resolve();
};

// eslint-disable-next-line require-await
export const authMiddleware = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', {session: false}, verifyCallback(req, resolve, reject))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};