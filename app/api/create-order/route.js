import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

export async function POST(request) {
  try {
    const { amount } = await request.json();
    
    const options = {
      amount: amount * 100, // Amount in paise (e.g., ₹100 = 10000)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id }, { status: 200 });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}