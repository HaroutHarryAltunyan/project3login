const User = require('../../models/Message');
const { ApolloError } = require('apollo-server-errors');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { username, email, password } }) { 
            // See if an OLD USER EXISTS WITH EMAIL ATTEMPTING TO REGISTER
            const oldUser = await User.findone({ email });

             // Throw error is that user exists
            if (oldUser) {
                throw new ApolloError('A user is already registered with the email' + email, 'USER_ALREADY_EXIST');
            }

            // Encrypt password
            var encryptedPassword = await bcrypt.hash(password, 10);

            // Build out mongoose model (User)
            const newUser = new User ({
                username: username,
                email: email.toLowerCase(),
                password: encryptedPassword
            })

            // Create JWT (attach to user moddel)
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expireIn: "2h"
                }
            );

            newUser.token = token;

            // Save our user in Mongoose
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }

        }
    },
    Query: {
        // message: (_, { ID }) => Message.findById(ID), 
    },
};
