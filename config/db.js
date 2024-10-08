
//import the mongoose
const mongoose = require('mongoose');

// Load environment variables from .env file
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Error while connecting to DB", error);

    }
}

//export the connectDB
module.exports = connectDB;