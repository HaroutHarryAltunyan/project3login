const User = require('../../models/Message');

module.exports = {
    Mutation: {
        async registerUser(_, { registerInput: { text, username } }) { 

        }
    },
    Query: {
        // message: (_, { ID }) => Message.findById(ID), 
    },
};
