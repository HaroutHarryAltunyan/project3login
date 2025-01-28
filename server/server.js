require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// // MongoDB connection string
// const MONGODB = process.env.MONGODB_URI;

const MONGODB = "mongodb+srv://haroutyunhaltunyan93:TOxbTgT3kG8fXtnS@loginproject3.puzfb.mongodb.net/?retryWrites=true&w=majority&appName=loginproject3";

// Port configuration
const PORT = process.env.PORT || 4001;

// Create a new ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the request to the context if needed
});

// Connect to MongoDB using Mongoose
mongoose

// this is mongodb when without.env


  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
    // Start Apollo Server after MongoDB connection is successful
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// // this is for mongodb in .env
//   const MONGODB = process.env.MONGODB_URI;
// mongoose.connect(MONGODB)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err.message));

