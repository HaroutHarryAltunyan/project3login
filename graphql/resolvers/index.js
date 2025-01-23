const messagesResolvers = require('./messages');

module.exports = {
    Query: {

    },
    Mutation: {
        ...messagesResolvers.Mutation
    }
}