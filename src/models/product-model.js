import mongoose from "mongoose";
import {toJSON} from "./plugins/toJSON-plugin.js";
import {paginate} from "./plugins/paginate-plugin.js";

const productSchema = mongoose.Schema({
        productId: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        productName: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
        },
        productStatus: {
            type: Boolean,
            default: true,
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
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);

export {
    Product
};