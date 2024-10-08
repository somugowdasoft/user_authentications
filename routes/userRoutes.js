//import express
const express = require("express");
//import all user controlles
const { register, login, getUserProfile } = require("../controllers/userController");
const {verifyToken} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getUserProfile)

//export router
module.exports = router;