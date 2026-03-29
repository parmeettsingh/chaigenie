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

import mongoose from "mongoose"

const connectDB = async () => {

  if (mongoose.connections[0].readyState) {
    return
  }

  await mongoose.connect(process.env.MONGODB_URI)

  console.log("MongoDB Connected")
}

export default connectDB