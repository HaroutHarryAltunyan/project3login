const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

// Use environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'UNSAFE_STRING';

module.exports = (context) => {
    // Extract the authorization header from the request
    const authHeader = context.req.headers.authorization;

    if (!authHeader) {
        throw new Error('Authorization header must be provided');
    }

    // Ensure the token follows the "Bearer [token]" format
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new Error("Authentication token must be formatted as 'Bearer [token]'");
    }

    try {
        // Verify and decode the JWT
        const user = jwt.verify(token, JWT_SECRET);
        return user; // Return the decoded user object
    } catch (err) {
        throw new AuthenticationError('Invalid or expired token');
    }
};