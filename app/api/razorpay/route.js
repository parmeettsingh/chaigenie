// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import Razorpay from "razorpay";
// import connectDB from "@/db/connectDb";

// export const POST = async (request) => {
//     await connectDB();
//     let body = await request.formData();
//     body = Object.fromEntries(body);

//     //Check if razorpayOrderid is present on the server
//     let p = await Payment.findOne({ oid: body.razorpay_order_id });
//     if (!p) {
//         return NextResponse.json({ success: false, message: "Order Id not found" });
//     }

//     //Verify the payment
//     let xx = validatePaymentVerification(
//         {
//             "order_id": body.razorpay_order_id,
//             "payment_id": body.razorpay_payment_id,
//         }, body.razorpay_signature, process.env.KEY_SECRET
//     );

//     if (xx){
//         //Update the payment status
//         const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done: "true"}, {status: "paid"}, {new: true});
//         return NextResponse.redirect(`${process.env.url}/${updatedPayment.to_user}?paymentdone=true`);
//     }
//     else{
//         return NextResponse.json({sucess: false, message: "Payment verification failed"});
//     }
// }

import connectDB from "@/db/connectDb"
import Payment from "@/models/Payment"

export async function POST(req) {
    try {
        const body = await req.json()
        await connectDB()

        // Find and update the payment status
        const updated = await Payment.findOneAndUpdate(
            { orderId: body.razorpay_order_id },
            {
                paymentId: body.razorpay_payment_id,
                status: "paid" // Ensure this matches the string in fetchpayments
            },
            { new: true }
        )

        if (!updated) {
            return Response.json({ success: false, message: "Order ID not found" }, { status: 404 })
        }

        console.log("PAYMENT UPDATED:", updated)
        return Response.json({ success: true })

    } catch (error) {
        console.error("VERIFY ERROR:", error)
        return Response.json({ success: false, error: error.message }, { status: 500 })
    }
}