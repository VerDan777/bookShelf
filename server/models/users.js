const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const autoIncrement = require("mongoose-auto-increment");
const jwt = require("jsonwebtoken");
const config = require("../config/config").get(process.env.NODE_ENV);
const SALT_I = 10;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        maxenght: 100
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
        default: null
    }
}, {
    versionKey: false,
    timestamps: true
});

const User = mongoose.model('users', userSchema);
userSchema.plugin(autoIncrement.plugin,{
    model: 'users',
    field: "_id",
    startAt: 1,
    incrementBy: 1
});

module.exports = { User };