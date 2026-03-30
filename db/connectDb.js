import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  // DEBUG: Check if the URI even exists
  if (!process.env.MONGODB_URI) {
    console.error("DEBUG ERROR: MONGODB_URI is undefined in Vercel!");
    throw new Error("Missing MONGODB_URI");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // This will print the REAL reason (e.g., Timeout, IP blocked, or User not found)
    console.error("REAL MONGO ERROR:", error.message);
    throw new Error(`Database connection failed: ${error.message}`);
  }
};

export default connectDB;