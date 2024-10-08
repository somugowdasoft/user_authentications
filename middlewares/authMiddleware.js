// Import the jsonwebtoken for creating JWTs
const jwt = require("jsonwebtoken");

// Import the User model database interactions
const User = require("../models/user");

// Middleware to verify the token
exports.verifyToken = async (req, res, next) => {
    // get authorization header from the request 
    const authHeader = req.headers.authorization;

    //if no token provides, resond with 403 forbidden
    if (!authHeader) {
        return res.status(403).json({
            message: "Token is required"
        })
    }

    //extract the token from the 'bearer <token> format, Split by space to get the token
    const token = authHeader.split(' ')[1];

    // Verify the token
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        // Find the user by ID in the decoded token
        const user = await User.findById(decode.userId)
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Attach the user information to the request
        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
}