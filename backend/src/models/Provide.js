const { Schema, model } = require("mongoose");

const ProvideSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },

        agency: {
            type: String,
            required: true,
        },

        cnpj: {
            type: String,
            required: true,
            unique: true,
        },

        address: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true
        }
    })

module.exports = model("Provide", ProvideSchema);
