// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://localhost:27017/chaigenie`, {
//       useNewUrlParser: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);  
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// }
// export default connectDB;

import mongoose from "mongoose";

const connectDB = async () => {
  // Check if we already have a connection
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    // Attempt to connect using the environment variable
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Critical MongoDB Connection Error:", error.message);
    // Optional: throw the error so the calling function knows it failed
    throw new Error("Database connection failed");
  }
};

export default connectDB;