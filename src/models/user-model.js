import mongoose from "mongoose";
import {toJSON} from "./plugins/toJSON-plugin.js";
import {paginate} from "./plugins/paginate-plugin.js";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
        userId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            private: true,
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            }
        },
        role: {
            type: String,
            default: 'user',
        },
        userStatus: {
            type: Boolean,
        },
        createdBy: {
            type: String,
            default: 'System'
        },
        updatedBy: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true,
    });

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

// eslint-disable-next-line require-await
userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

export {
    User
};
