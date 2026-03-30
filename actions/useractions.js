"use server"

import Razorpay from "razorpay"
import connectDB from "@/db/connectDb"
import Payment from "@/models/Payment"
import User from "@/models/Users" 

export const initiate = async (amount, username, paymentform) => {
    try {
        await connectDB()

        // UPDATED: Standardizing key names to match your Vercel Dashboard
        const keyId = process.env.NEXT_PUBLIC_KEY_ID || process.env.KEY_ID;
        const keySecret = process.env.RAZORPAY_SECRET || process.env.KEY_SECRET;

        // 1. Validation Check
        if (!keyId || !keySecret) {
            console.error("Missing Razorpay Keys. Check Vercel Env Variables.");
            throw new Error("Server Configuration Error: Missing Keys");
        }

        const instance = new Razorpay({
            key_id: keyId,
            key_secret: keySecret
        })

        // 2. Create Razorpay Order
        const options = {
            amount: Number(amount), 
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        const order = await instance.orders.create(options)

        // 3. Save to DB
        await Payment.create({
            username: username,
            name: paymentform?.name || "Anonymous",
            message: paymentform?.message || "",
            amount: amount / 100, 
            orderId: order.id,
            status: "created"
        })

        // 4. Return plain object
        return JSON.parse(JSON.stringify(order))

    } catch (error) {
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