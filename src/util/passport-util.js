import {config} from "../application/config.js";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import {tokenTypes} from "./token-constants.js";
import {User} from "../models/user-model.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }

    const userId = payload.sub;
    const user = await User.findOne({userId});

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }

};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

export {
  jwtStrategy
};