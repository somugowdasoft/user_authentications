//import express
const express = require("express");
//import all user controlles
const { register, login, getUserProfile } = require("../controllers/userController");

// Import register and login functions from the userController
const {verifyToken} = require("../middlewares/authMiddleware")

// creating a router
const router = express.Router();

// This route handles POST requests for user registration
router.post("/register", register);

// This route handles POST requests for user login
router.post("/login", login);

// This route handles GET for getting user information
router.get("/profile", verifyToken, getUserProfile)

//export router
module.exports = router;