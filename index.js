 const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// MongoDB connection string with your credentials
const MONGODB = "mongodb+srv://haroutyunhaltunyan93:F6EYxlEDC6A2vJbW@clusterreactloginprojec.z1zgk.mongodb.net/?retryWrites=true&w=majority&appName=Clusterreactloginproject3";

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose
    .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true }) // Added `useUnifiedTopology` for better compatibility
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    })
    .catch((err) => {
        console.error("Connection error", err);
    });