import {config} from "../application/config.js";
import moment from "moment";
import jwt from "jsonwebtoken";
import {tokenTypes} from "./token-constants.js";
const generateToken = (user, expires, type, secret = config.jwt.secret) => {
    const payload = {
        sub: user.userId,
        email: user.email,
        name: user.firstName,
        role: user.role,
        iss: 'our_secure_system',
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

// eslint-disable-next-line require-await
const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user, accessTokenExpires, tokenTypes.ACCESS);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
    };
};

export {
    generateToken,
    generateAuthTokens
};