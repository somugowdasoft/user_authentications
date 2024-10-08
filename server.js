require("dotenv").config();
//import express
const express = require('express');
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

//import userRoute
const userRoutes = require("./routes/userRoutes");

const app = express();

//connect to database
connectDB();

// middleware to parser JSON
app.use(bodyParser.json())

//Routes
app.use("/api/auth", userRoutes);

//Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`);
})
