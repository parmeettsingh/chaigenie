// "use server"

// import Razorpay from "razorpay"

// export const initiate = async (amount, username, paymentform) => {

//   try {

//     if (!amount) {
//       throw new Error("Amount missing")
//     }

//     const instance = new Razorpay({
//       key_id: process.env.KEY_ID,
//       key_secret: process.env.KEY_SECRET
//     })

//     const options = {
//       amount: amount,
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7)
//     }

//     const order = await instance.orders.create(options)

//     console.log("ORDER CREATED:", order)

//     return order

//   } catch (error) {

//     console.error("RAZORPAY FULL ERROR:", error)

//     throw new Error("Payment initiation failed")
//   }
// }

"use server"

import Razorpay from "razorpay"
import connectDB from "@/db/connectDb"
import Payment from "@/models/Payment"
import User from "@/models/Users" 

export const initiate = async (amount, username, paymentform) => {
    try {
        await connectDB()

        // 1. Validation Check
        if (!process.env.KEY_ID || !process.env.KEY_SECRET) {
            console.error("Missing Razorpay Keys in Environment Variables");
            throw new Error("Server Configuration Error");
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })

        // 2. Create Razorpay Order
        const options = {
            amount: Number(amount), // This is already multiplied by 100 in PaymentPage
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const order = await instance.orders.create(options)

        // 3. Save to DB
        // Make sure your Payment model fields match these keys!
        await Payment.create({
            username: username,
            name: paymentform?.name || "Anonymous",
            message: paymentform?.message || "",
            amount: amount / 100, // Store as Rupees
            orderId: order.id,
            status: "created"
        })

        // 4. Return plain object
        return JSON.parse(JSON.stringify(order))

    } catch (error) {
        // This will print the ACTUAL error to your terminal (e.g., "Unauthorized" or "Bad Request")
        console.error("RAZORPAY INTERNAL ERROR:", error); 
        throw new Error(`Payment initiation failed: ${error.message}`)
    }
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({ username: username })
    if (!u) return null
    return JSON.parse(JSON.stringify(u))
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ username: username, status: "paid" }).sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(p))
}
    