const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    code: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    uniqueValue: {
        type: String,
        required: true
    },

    type: {
        type: String,
        required: true
    }

});

module.exports = model("Product", ProductSchema);