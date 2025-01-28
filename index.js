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


















/////////////////////////////////////




// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');

// // MongoDB connection string
// const MONGODB = "mongodb+srv://haroutyunhaltunyan93:TOxbTgT3kG8fXtnS@loginproject3.puzfb.mongodb.net/?retryWrites=true&w=majority&appName=loginproject3"

// // Create a new ApolloServer instance
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Connect to MongoDB using Mongoose
// mongoose.connect(MONGODB, {useNewUrlParser: true})
//   .then(() => {
//     console.log("MongoDB Connected");
//     // Start Apollo Server after MongoDB connection is successful
//     return server.listen({ port: 3024 });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`)
//   });
//   // .catch((err) => {
//   //   console.error("Error connecting to MongoDB:", err);
//   // });





// // //////////////////////////////////////////////////////////////////              ////////////////  this is new with security updates ///////////////////// //


//   require('dotenv').config(); // Load environment variables
//   const { ApolloServer } = require('apollo-server');
//   const mongoose = require('mongoose');
  
//   const typeDefs = require('./graphql/typeDefs');
//   const resolvers = require('./graphql/resolvers');
  
//   // Environment Variables
//   const MONGODB = process.env.MONGODB || "your-default-connection-string";     // ////////////////// Gets the MongoDB connection string //////////////////// //
//   const PORT = process.env.PORT || 3001;                                       // //////////////////        Gets the server port        //////////////////// //
  
//   // Create a new ApolloServer instance
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req }) => {
//       // Add context logic here if needed (e.g., extracting auth headers)
//       return { req };
//     },
//   });
  
//   // Connect to MongoDB using Mongoose
//   mongoose
//     .connect(MONGODB, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true, // Recommended for modern MongoDB drivers
//     })
//     .then(() => {
//       console.log("MongoDB Connected");
//       // Start Apollo Server after MongoDB connection is successful
//       return server.listen({ port: PORT });
//     })
//     .then((res) => {
//       console.log(`🚀 Server running at ${res.url}`);
//     })
//     .catch((err) => {
//       console.error("Error connecting to MongoDB:", err);
//     });
  
//   // Graceful Shutdown
//   process.on("SIGINT", async () => {
//     console.log("Shutting down...");
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed.");
//     process.exit(0);
//   });




























































































































  // // step 1 npm init --yes 
// // step 2 npm install apollo-server graphql mongoose nodemon
// // step 3 npm install mongodb



// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs'); 
// const resolvers = require('./graphql/resolvers');

// const MONGODB = 
// "mongodb+srv://haroutyunhaltunyan93:RMEizsGcjSnfT7VF@cluster1.cw144.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"


// // note to self resolve this issue


// // Don't mess with this, connects to MongoDB with my auth credentials



// // const { MongoClient, ServerApiVersion } = require('mongodb');
// // const uri = "mongodb+srv://haroutyunhaltunyan93:RMEizsGcjSnfT7VF@cluster1.cw144.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// // const client = new MongoClient(uri, {
// //   serverApi: {
// //     version: ServerApiVersion.v1,
// //     strict: true,
// //     deprecationErrors: true,
// //   }
// // });

// // async function run() {
// //   try {
// //     // Connect the client to the server	(optional starting in v4.7)
// //     await client.connect();
// //     // Send a ping to confirm a successful connection
// //     await client.db("admin").command({ ping: 1 });
// //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
// //   } finally {
// //     // Ensures that the client will close when you finish/error
// //     await client.close();
// //   }
// // }
// // run().catch(console.dir);



// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// mongoose
//   .connect(MONGODB, { useNewUrlParser: true})
//   .then(() => {
//     console.log("MongoDB Connected");
//     return server.listen({ port: 5001 });
//   })
//   .then((res) => {
//     console.log(`Server running at ${res.url}`);
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err);
//   });


