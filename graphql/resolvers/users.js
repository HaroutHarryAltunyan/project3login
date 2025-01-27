const User = require('../../models/User'); 
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) { 
            // See if an OLD USER EXISTS WITH EMAIL ATTEMPTING TO REGISTER
            const oldUser = await User.findOne({ email }); 

            // Throw error if that user exists
            if (oldUser) {
                throw new ApolloError('A user is already registered with the email ' + email, 'USER_ALREADY_EXIST');
            }

            // Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // Build out mongoose model (User)
            const newUser = new User({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            });

            // Create JWT (attach to user model)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            // Save our user in MongoDB
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            };
        },
        async loginUser(_, { loginInput: { email, password } }) { 
            // See if a user exists with the email
            const user = await User.findOne({ email }); 
            // Check if the entered password equals the encrypted password
            if (user && (await bcrypt.compare(password, user.password))) { 

                // Create a NEW token 
                const token = jwt.sign(
                    { user_id: user._id, email }, 
                    "UNSAFE_STRING",
                    {
                        expiresIn: "2h"
                    }
                );
                // Attach token to user model that we found above 
                user.token = token;

                return {
                    id: user.id,
                    ...user._doc
                }
            } else {
                // If user doesn't exist or password is incorrect, return error
                throw new ApolloError('Incorrect password', "INCORRECT_PASSWORD");
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID), 
    },
};