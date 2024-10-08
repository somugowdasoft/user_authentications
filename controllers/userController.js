//import the user model
const User = require("../models/user");

//tokens
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    //get user input from request body
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
        user = new User({ userName, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token: token, message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })

    }
}

//Login User
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
        const token = jwt.sign(
            { userId: user._id },   // Payload
            process.env.JWT_SECRET,  // Secret key from .env
            { expiresIn: "1h" }    // Token expiry time
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}

//Get user Info
exports.getUserProfile = async (req, res) => {

    try {
        // Fetch the user's information using the userId from the JWT
        const user = await User.findById(req.user).select("-password");

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user profile data
        res.json(user);

    } catch (error) {
        res.status(500).json({
            error: "Server Error"
        })
    }
}
