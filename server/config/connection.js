// import dotenv from 'dotenv';
// dotenv.config();


// import mongoose from 'mongoose';

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/proj3');

// const db = mongoose.connection;

// export default db;


const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/proj3', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;