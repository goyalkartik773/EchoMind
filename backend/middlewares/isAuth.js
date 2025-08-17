const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware: isAuth
 * -------------------
 * - Validates JWT from cookies to check if the user is authenticated.
 * - If valid: attaches `userId` to request object and continues.
 * - If missing or invalid: responds with 401 Unauthorized.
 */
const isAuth = async (req, res, next) => {
    try {
        // Extract token from cookies
        const token = req.cookies.token;

        // If no token, reject request
        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        // Verify token using JWT secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach decoded user ID to request object
        req.userId = decoded.id;

        // Continue to the next middleware/route handler
        next();
    } 
    catch (err) {
        // If token verification fails
        console.error("JWT verification failed:", err.message);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = isAuth;
