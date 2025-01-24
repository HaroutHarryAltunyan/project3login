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
                    expiresIn: "2h"
                }
            );

            newUser.token = token;

            // Save our user in Mongoose
            const res = await newUser.save();

            return {
                id: res.id,
                ...res._doc
            }
        },
        async loginUser(_, { loginInput: { email, password } }) { 
// See if a user exists with the email
            const user = await User.findone({ email });
// Check if the entered password equals the encypted password
            if (user && (await bcrypt.compare(password, user.password))) {
// Create a NEW token 
            const token = jwt.sign(
                { user_id: newUser._id, email },
                "UNSAFE_STRING",
                {
                    expiresIn: "2h"
                }
            );
// Attatch token to user model that we found above 
            user.token = token;

            return {
                id: user.id,
                ...user._doc
            }
        } else {
// If user doesn't exist, return error
            throw new ApolloError('Incorrect password', "INCORRECT_PASSWORD");
            }
        }
    },
    Query: {
        user: (_, { ID }) => User.findById(ID), 
    },
};














// const User = require('../../models/Message');
// const { ApolloError } = require('apollo-server-errors');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// module.exports = {
//     Mutation: {
//         async registerUser(_, { registerInput: { username, email, password } }) { 
//             // See if an OLD USER EXISTS WITH EMAIL ATTEMPTING TO REGISTER
//             const oldUser = await User.findOne({ email }); // Fixed typo: findone -> findOne

//             // Throw error if that user exists
//             if (oldUser) {
//                 throw new ApolloError('A user is already registered with the email ' + email, 'USER_ALREADY_EXIST'); // Added space after 'email'
//             }

//             // Encrypt password
//             var encryptedPassword = await bcrypt.hash(password, 10);

//             // Build out mongoose model (User)
//             const newUser = new User({
//                 username: username,
//                 email: email.toLowerCase(),
//                 password: encryptedPassword
//             });

//             // Create JWT (attach to user model)
//             const token = jwt.sign(
//                 { user_id: newUser._id, email },
//                 "UNSAFE_STRING",
//                 {
//                     expiresIn: "2h" // Fixed typo: expireIn -> expiresIn
//                 }
//             );

//             newUser.token = token;

//             // Save our user in Mongoose
//             const res = await newUser.save();

//             return {
//                 id: res.id,
//                 ...res._doc
//             };
//         },
//         async loginUser(_, { loginInput: { email, password } }) { 
//             // See if a user exists with the email
//             const user = await User.findOne({ email }); // Fixed typo: findone -> findOne

//             // Check if the entered password equals the encrypted password
//             if (user && (await bcrypt.compare(password, user.password))) {
//                 // Create a NEW token 
//                 const token = jwt.sign(
//                     { user_id: user._id, email }, // Fixed typo: newUser -> user
//                     "UNSAFE_STRING",
//                     {
//                         expiresIn: "2h" // Fixed typo: expireIn -> expiresIn
//                     }
//                 );

//                 // Attach token to user model that we found above 
//                 user.token = token;

//                 return {
//                     id: user.id,
//                     ...user._doc
//                 };
//             } else {
//                 // If user doesn't exist or password is incorrect, return error
//                 throw new ApolloError('Incorrect password', "INCORRECT_PASSWORD");
//             }
//         }
//     },
//     Query: {
//         user: (_, { ID }) => User.findById(ID), 
//     },
// };































// const User = require('../../models/Messages'); // Corrected model import
// const { ApolloError } = require('apollo-server-errors');
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // Helper function to create JWT
// const createToken = (userId, email) => {
//     return jwt.sign(
//         { user_id: userId, email },
//         process.env.JWT_SECRET || "UNSAFE_STRING", // Use environment variable
//         {
//             expiresIn: "2h"
//         }
//     );
// };

// module.exports = {
//     Mutation: {
//         async registerUser(_, { registerInput: { username, email, password } }) {
//             try {
//                 // Check if a user with the given email already exists
//                 const oldUser = await User.findOne({ email });

//                 if (oldUser) {
//                     throw new ApolloError(`A user is already registered with the email ${email}`, 'USER_ALREADY_EXIST');
//                 }

//                 // Encrypt the password
//                 const encryptedPassword = await bcrypt.hash(password, 10);

//                 // Create a new user instance
//                 const newUser = new User({
//                     username,
//                     email: email.toLowerCase(),
//                     password: encryptedPassword,
//                 });

//                 // Generate a token
//                 const token = createToken(newUser._id, email);

//                 // Attach the token to the new user
//                 newUser.token = token;

//                 // Save the user to the database
//                 const res = await newUser.save();

//                 return {
//                     id: res.id,
//                     ...res._doc
//                 };
//             } catch (err) {
//                 console.error(err);
//                 throw new ApolloError('Error registering user', 'REGISTRATION_ERROR');
//             }
//         },

//         async loginUser(_, { loginInput: { email, password } }) {
//             try {
//                 // Check if a user exists with the provided email
//                 const user = await User.findOne({ email });

//                 if (!user) {
//                     throw new ApolloError('User not found', 'USER_NOT_FOUND');
//                 }

//                 // Verify the password
//                 const isMatch = await bcrypt.compare(password, user.password);

//                 if (!isMatch) {
//                     throw new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
//                 }

//                 // Generate a new token
//                 const token = createToken(user._id, email);

//                 // Attach the token to the user
//                 user.token = token;

//                 return {
//                     id: user.id,
//                     ...user._doc
//                 };
//             } catch (err) {
//                 console.error(err);
//                 throw new ApolloError('Error logging in user', 'LOGIN_ERROR');
//             }
//         },
//     },

//     Query: {
//         async user(_, { ID }) {
//             try {
//                 const user = await User.findById(ID);
//                 if (!user) {
//                     throw new ApolloError('User not found', 'USER_NOT_FOUND');
//                 }
//                 return user;
//             } catch (err) {
//                 console.error(err);
//                 throw new ApolloError('Error fetching user', 'USER_FETCH_ERROR');
//             }
//         }
//     },
// };