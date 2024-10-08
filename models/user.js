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

//Hass password before saving user document
userSchema.pre('save', async function (next) {
    //If password has not been modified, skip hasing
    if (!this.isModified('password')) next();

    //Generate a salt (random data for hasing)
    const salt = await bcrypt.genSalt(10);

    //Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
})

//export the user schema
const User = mongoose.model('User', userSchema);
module.exports = User;