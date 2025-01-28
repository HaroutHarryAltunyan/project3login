import messagesResolvers from './messages.js';
import usersResolvers from './users.js';


export default {
    Query: {
        ...messagesResolvers.Query, 
        ...usersResolvers.Query
    },
    Mutation: {
        ...messagesResolvers.Mutation,
        ...usersResolvers.Mutation
    },
};