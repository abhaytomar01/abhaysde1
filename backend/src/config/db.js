const mongoose = require('mongoose');

let isInMemoryFallback = false;
let memoryStore = []; // Fallback in-memory storage if DB connection fails

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_app';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    isInMemoryFallback = false;
  } catch (err) {
    console.warn(`⚠️ Could not connect to MongoDB (${err.message}). Using In-Memory Fallback Store.`);
    isInMemoryFallback = true;
  }
};

const getIsInMemory = () => isInMemoryFallback;
const getMemoryStore = () => memoryStore;
const setMemoryStore = (data) => { memoryStore = data; };

module.exports = {
  connectDB,
  getIsInMemory,
  getMemoryStore,
  setMemoryStore,
};
