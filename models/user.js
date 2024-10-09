//import mongoose
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//export the user schema
const User = mongoose.model('User', userSchema);
module.exports = User;