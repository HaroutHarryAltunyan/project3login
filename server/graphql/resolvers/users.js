const User = require('../../models/User');
const { ApolloError } = require('apollo-server-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'UNSAFE_STRING'; // Use environment variables for secrets
const TOKEN_EXPIRATION = '2h'; // Token expiration time

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) {
            try {
                // Check if the email is already in use
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new ApolloError(
                        `A user is already registered with the email: ${email}`,
                        'USER_ALREADY_EXISTS'
                    );
                }

                // Hash the password
                const hashedPassword = await bcrypt.hash(password, 10);

                // Create a new user instance
                const newUser = new User({
                    username,
                    email: email.toLowerCase(),
                    password: hashedPassword,
                });

                // Generate a JWT
                const token = jwt.sign(
                    { userId: newUser._id, email },
                    JWT_SECRET,
                    { expiresIn: TOKEN_EXPIRATION }
                );
                newUser.token = token;

                // Save the user to the database
                const savedUser = await newUser.save();

                // Return the saved user
                return {
                    id: savedUser.id,
                    ...savedUser._doc,
                };
            } catch (error) {
                throw new ApolloError(`Registration failed: ${error.message}`, 'REGISTRATION_ERROR');
            }
        },

        async loginUser(_, { loginInput: { email, password } }) {
            try {
                // Find the user by email
                const user = await User.findOne({ email });
                if (!user) {
                    throw new ApolloError('User not found', 'USER_NOT_FOUND');
                }

                // Validate the password
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
                }

                // Generate a new token
                const token = jwt.sign(
                    { userId: user._id, email },
                    JWT_SECRET,
                    { expiresIn: TOKEN_EXPIRATION }
                );
                user.token = token;

                // Return the user with the new token
                return {
                    id: user.id,
                    ...user._doc,
                };
            } catch (error) {
                throw new ApolloError(`Login failed: ${error.message}`, 'LOGIN_ERROR');
            }
        },
    },

    Query: {
        async user(_, { ID }) {
            try {
                const user = await User.findById(ID);
                if (!user) {
                    throw new ApolloError('User not found', 'USER_NOT_FOUND');
                }
                return user;
            } catch (error) {
                throw new ApolloError(`Failed to fetch user: ${error.message}`, 'FETCH_USER_ERROR');
            }
        },
    },
};