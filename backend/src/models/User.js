const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const authConfig = require("../config/auth");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password);
    }
};

UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, authConfig.secret, {
            expiresIn: authConfig.ttl
        });
    }
};

module.exports = model("User", UserSchema);
