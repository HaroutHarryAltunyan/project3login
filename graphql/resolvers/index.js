const messagesResolvers = require('./messages');

module.exports = {
    Query: {
        ...messagesResolvers.Query, // Spread the Query resolvers if defined in 'messages'
    },
    Mutation: {
        ...messagesResolvers.Mutation, // Spread the Mutation resolvers from 'messages'
    },
};