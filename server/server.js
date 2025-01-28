require('dotenv').config();

const express = require('express');

const app = express();

const { ApolloServer } = require('@apollo/server');
const expressMiddleware = require('@apollo/server/express4');
const db = './config/connection';

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

// // MongoDB connection string
const MONGODB = process.env.MONGODB_URI;

// const MONGODB = "mongodb+srv://haroutyunhaltunyan93:TOxbTgT3kG8fXtnS@loginproject3.puzfb.mongodb.net/?retryWrites=true&w=majority&appName=loginproject3";

// Port configuration
const PORT = process.env.PORT || 4001;

// Create a new ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Pass the request to the context if needed
});

// Connect to MongoDB using Mongoose


// this is mongodb when without.env

const startApolloServer = async () => {
  // start Apollo Server Instance
  await server.start();
  // Connect to our DataBase
  await db;
  // These 2 lines PARSE the INCOMING data BODY (req.body)
  app.use(express.urlencoded({ extended: false}));
  app.use(express.json());

  app.use('/graphql', expressMiddleware);

  app.listen(PORT, () => {
    console.log("Server started...");
  });
};

/*
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
*/

// // this is for mongodb in .env
//   const MONGODB = process.env.MONGODB_URI;
// mongoose.connect(MONGODB)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err.message));

startApolloServer();



























// require('dotenv').config();
// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4');
// const mongoose = require('mongoose');
// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');

// const app = express();

// // MongoDB connection string
// const MONGODB = process.env.MONGODB_URI || 'mongodb://localhost:27017/proj3';

// // Port configuration
// const PORT = process.env.PORT || 4001;

// // Create a new ApolloServer instance
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }), // Pass the request to the context if needed
// });

// // Start the Apollo Server and connect to MongoDB
// const startApolloServer = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(MONGODB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');

//     // Start Apollo Server
//     await server.start();

//     // Middleware for Express
//     app.use(express.urlencoded({ extended: false }));
//     app.use(express.json());
//     app.use('/graphql', expressMiddleware(server));

//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Server started at http://localhost:${PORT}/graphql`);
//     });
//   } catch (err) {
//     console.error('Error starting server:', err.message);
//   }
// };

// // Start the server
// startApolloServer();





































// require('dotenv').config();

// const express = require('express');
// const { ApolloServer } = require('@apollo/server');
// const { expressMiddleware } = require('@apollo/server/express4'); // Destructure expressMiddleware
// const { json } = require('body-parser');
// const db = require('./config/connection'); // Ensure this is correctly exported in your project

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');

// // MongoDB connection string
// const MONGODB = process.env.MONGODB_URI;

// // Port configuration
// const PORT = process.env.PORT || 4001;

// // Create a new ApolloServer instance
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }), // Pass the request to the context if needed
// });

// // Start the Apollo Server
// const startApolloServer = async () => {
//   // Connect to MongoDB
//   await db; // Ensure the connection file handles the logic properly
//   console.log('MongoDB connected');

//   // Start the Apollo Server
//   await server.start();

//   // Initialize Express
//   const app = express();

//   // Parse incoming requests
//   app.use(json());

//   // Apply Apollo middleware
//   app.use('/graphql', expressMiddleware(server));

//   // Start listening
//   app.listen(PORT, () => {
//     console.log(`Server started at http://localhost:${PORT}/graphql`);
//   });
// };

// // Start the server
// startApolloServer().catch((error) => {
//   console.error('Error starting server:', error.message);
// });









// // Import dependencies
// import dotenv from 'dotenv';
// import express from 'express';
// import { ApolloServer } from '@apollo/server';
// import { expressMiddleware } from '@apollo/server/express4';
// import db from './config/connection.js';
// import typeDefs from './graphql/typeDefs.js';
// import resolvers from './graphql/resolvers.js';

// // Configure environment variables
// dotenv.config();

// // Port configuration
// const PORT = process.env.PORT || 4001;

// // Create a new ApolloServer instance
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req }) => ({ req }), // Pass the request to the context if needed
// });

// // Start the Apollo Server
// const startApolloServer = async () => {
//   try {
//     // Connect to MongoDB
//     await db; // Ensure this is properly configured in `connection.js`
//     console.log('MongoDB connected');

//     // Start Apollo Server
//     await server.start();

//     // Initialize Express
//     const app = express();

//     // Parse incoming requests
//     app.use(express.json());

//     // Apply Apollo middleware
//     app.use('/graphql', expressMiddleware(server));

//     // Start listening
//     app.listen(PORT, () => {
//       console.log(`Server started at http://localhost:${PORT}/graphql`);
//     });
//   } catch (error) {
//     console.error('Error starting server:', error.message);
//   }
// };

// // Start the server
// startApolloServer();