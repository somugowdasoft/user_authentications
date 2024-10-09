//import the user model
const User = require("../models/user");

// Import the jsonwebtoken for creating JWTs
const jwt = require('jsonwebtoken');

// Import the bcrypt for hashing passwords
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    //Get user input from request body
    const { userName, email, password } = req.body;

    try {
        //validate the user in db
        let user = await User.findOne({ email });
        //if user exists
        if (user) {
            res.status(400).json({
                message: "User aleady exists"
            })
        }

        //Hass the password before save
        const hashedPassword = await bcrypt.hash(password, 10);

        //if user not exist create the user
        const newUser = new User({ userName, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })

    }
}

// Controller function for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalide credentails"
            })
        }

        //Compare the password with hashed password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
     
        //Gerenate a JWT Token
        const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1hr"} )

        //return the token to the user
        res.json({ token });

    } catch (error) {
        res.status(500).json({
            error: 'Login failed',
            message: error.message
        })
    }
}

//Get user profile
exports.getUserProfile = async (req, res) => {

    try {
        // Fetch the user's information using the userId from the JWT
        const user = req.user;
        if(!req.user) {
            return res.status(404).json({
                message: "User not found",
            })
        }

         // Return user profile data
        res.status(200).json({
            id: user._Id,
            username: user.userName,
            email: user.email,
        })
       
    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}
