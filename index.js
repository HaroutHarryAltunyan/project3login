const MONGODB = "mongodb+srv://haroutyunhaltunyan93:F6EYxlEDC6A2vJbW@clusterreactloginprojec.z1zgk.mongodb.net/?retryWrites=true&w=majority&appName=Clusterreactloginproject3"
// dont mess with this, connects to mongodb with my auth credentials 

const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./grapghql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(MONGODB, {useNewUrlParser: true})
