import express from "express";
import {router as routes} from "../route/index.js";
import httpStatus from "http-status";
import {ApiError} from "../util/api-error.js";
import {errorHandler} from "../middleware/error-middleware.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
export const web = express();

// set security HTTP headers
web.use(helmet());

// parse json request body
web.use(express.json());

// parse urlencoded request body
web.use(express.urlencoded({ extended: true }));

// sanitize request data
web.use(xss());
web.use(mongoSanitize());

// api routes
web.use('/api/v1', routes);

// send back a 404 error for any unknown api request
web.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found.'));
});

// handle error
web.use(errorHandler);