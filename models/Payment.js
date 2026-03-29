// import mongoose from "mongoose";
// import { type } from "os";
// const {Schema, model} = mongoose;

// const PaymentSchema = new Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     to_user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     oid: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     amount: {
//         type: Number, 
//         required: true,
//     },
//     message: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now,
//     },
//     done: {type: Boolean, default: false}
// },
//     { timestamps: true }
// );


// export default mongoose.models.Payment || model("Payment", PaymentSchema);

import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({

  username: String,
  name: String,
  message: String,

  orderId: String,
  paymentId: String,

  amount: Number,
  status: String,

  createdAt: {
    type: Date,
    default: Date.now
  }

})

export default mongoose.models.Payment ||
mongoose.model("Payment", PaymentSchema)