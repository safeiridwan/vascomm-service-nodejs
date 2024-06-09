import {ApiError} from "../util/api-error.js";
import httpStatus from "http-status";
import {config} from "../application/config.js";
import {logger} from "../application/logging.js";

// eslint-disable-next-line require-await
const errorHandler = async (err, req, res, next) => {
    if (config.env === 'development') {
        logger.error(err.stack);
    }

    if (!err) {
        next();
        return;
    }

    if (!(err instanceof ApiError)) {
        let statusCode = err.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        let message = err.message || httpStatus[statusCode];
        if (err.name === 'MongoError' || err.name === 'MongooseError') {
            if (err.name === 'ValidationError') {
                statusCode = httpStatus.BAD_REQUEST;
                message = 'Validation Error';
            } else if (err.code && err.code === 11000) {
                // Handle duplicate key error (unique index violation)
                statusCode = httpStatus.BAD_REQUEST;
                message = 'Duplicate Key Error';
            } else {
                statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
                message = err.message || httpStatus[statusCode];
            }
        }

        const response = {
            code: statusCode,
            message,
            ...(config.env === 'development' && { stack: err.stack }),
        };

        res.status(statusCode).send(response).end();
    }  else {
        const { statusCode, message } = err;
        const response = {
            code: statusCode,
            message,
            ...(config.env === 'development' && { stack: err.stack }),
        };
        res.status(err.statusCode).send(response).end();
    }
};

export {
    errorHandler
};