"use client";
import React, { useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion"; // Consistency with Home/About
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { useSearchParams } from "next/navigation";  

const PaymentPage = ({ username }) => {
    const { data: session } = useSession();
    const [CurrentUser, setCurrentUser] = useState({});
    const [payments, setPayments] = useState([]);
    const [paymentform, setPaymentform] = useState({
        name: "",
        message: "",
        amount: ""
    });

    const searchParams = useSearchParams();
    const amountFromCart = searchParams.get('amount');

    // Set your payment form amount to this value automatically
    useEffect(() => {
        if (amountFromCart) {
            setPaymentform(prev => ({ ...prev, amount: amountFromCart }));
        }
    }, [amountFromCart]);

    useEffect(() => {
        if (username) {
            getData();
        }
    }, [username]);

    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
    }

    const getData = async () => {
        let u = await fetchuser(username);
        setCurrentUser(u);
        let dbpayments = await fetchpayments(username);
        setPayments(dbpayments);
    }

    const pay = async (amount) => {
        if (!amount) {
            alert("Please enter amount");
            return;
        }

        const finalAmount = Number(amount) * 100;
        let a;
        try {
            a = await initiate(finalAmount, username, paymentform);
        } catch (error) {
            console.error("SERVER ACTION ERROR:", error);
            alert("Server payment error. Check terminal.");
            return;
        }

        let orderId = a.id;
        var options = {
            // UPDATED: Using the correct public key variable
            "key": process.env.NEXT_PUBLIC_KEY_ID, 
            "amount": finalAmount,
            "currency": "INR",
            "name": "ChaiGenie",
            "description": "Sip and repeat",
            "image": "/tea.png", // Using your local logo
            "order_id": orderId,
            // UPDATED: Ensuring the callback URL is dynamic
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            handler: async function (response) {
                await fetch("/api/razorpay", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id
                    })
                });
                await getData();
                alert("Payment Successful 🎉")
            },
            "prefill": {
                "name": session?.user?.name || paymentform.name,
                "email": session?.user?.email || "",
                "contact": ""
            },
            "notes": {
                "message": paymentform.message || "Support Payment"
            },
            "theme": { "color": "#facc15" } // Matching yellow theme
        };

        if (window.Razorpay) {
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            alert("Razorpay SDK failed to load.");
        }
    }

    return (
        <main className="relative min-h-screen w-full bg-slate-950 text-white overflow-x-hidden pb-20">
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            {/* Radial Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] opacity-40"></div>

            {/* Cover and Profile Section */}
            <div className="relative w-full z-10">
                <Image
                    src={CurrentUser?.coverPic || "/bg.jpg"}
                    alt="Cover Image"
                    width={1400}
                    height={400}
                    className="object-cover w-full h-50 sm:h-70 md:h-87.5 shadow-2xl"
                />
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="rounded-full p-1 bg-slate-950 border-2 border-white/10"
                    >
                        <Image
                            src={CurrentUser?.profilePic || "/dolly.jpg"}
                            alt="Profile"
                            width={150}
                            height={150}
                            className="rounded-full object-cover w-30 h-30 sm:w-37.5 sm:h-37.5 border-2 border-yellow-400"
                        />
                    </motion.div>
                </div>
            </div>

            {/* User Info */}
            <div className="relative z-10 flex flex-col justify-center items-center mt-20 gap-2 text-white px-4">
                <motion.h1
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="font-black text-3xl sm:text-4xl tracking-tight"
                >
                    @{username}<span className="text-yellow-400">.</span>
                </motion.h1>
                <p className="text-slate-400 text-center max-w-md">
                    Helping creators fuel their passion, one cup of chai at a time.
                </p>
                <div className="flex gap-4 text-sm font-medium mt-2">
                    <span className="text-yellow-400">{payments.length} Payments</span>
                    <span className="text-slate-500">|</span>
                    <span>1M Followers</span>
                </div>

                {/* Main Payment Content */}
                <div className="payment flex flex-col lg:flex-row gap-8 w-full max-w-7xl mt-12 px-4 md:px-10">

                    {/* Supporters List */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="supporters w-full lg:w-1/2 rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-8">Recent <span className="text-yellow-400">Supporters</span></h2>
                        <ul className="space-y-6 overflow-y-auto max-h-112.5 pr-4 custom-scrollbar">
                            {payments.length === 0 && <li className="text-slate-500 italic">No supporters yet. Be the first to fuel the genie!</li>}
                            {payments.map((p, index) => (
                                <li key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 transition-hover hover:border-white/20">
                                    <Image width={40} height={40} src="/avatar.gif" alt="user avatar" className="rounded-full" />
                                    <div className="flex flex-col">
                                        <span className="text-sm">
                                            <span className="font-bold text-yellow-400">{p.name}</span> donated <span className="font-bold">₹{p.amount}</span>
                                        </span>
                                        <span className="text-xs text-slate-400 italic mt-1">&quot;{p.message}&quot;</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Payment Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="makePayment w-full lg:w-1/2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold mb-8 text-center lg:text-left">Send a <span className="text-yellow-400">Treat</span></h2>
                        <div className="flex flex-col gap-4">
                            <input onChange={handleChange} value={paymentform.name} name="name" type="text" placeholder="Your Name" className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/10 focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                            <input onChange={handleChange} value={paymentform.message} name="message" type="text" placeholder="Message for Creator" className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/10 focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />
                            <input onChange={handleChange} value={paymentform.amount} name="amount" type="number" placeholder="Enter Amount (₹)" className="w-full px-5 py-4 rounded-2xl bg-slate-900 border border-white/10 focus:ring-2 focus:ring-yellow-400 outline-none transition-all" />

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => pay(paymentform.amount)}
                                className="w-full py-4 mt-2 bg-yellow-500 text-black font-black rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:bg-yellow-400 transition-all"
                            >
                                Pay Now
                            </motion.button>

                            <div className="flex flex-wrap gap-3 mt-6 justify-center">
                                {[100, 200, 500].map(amt => (
                                    <button
                                        key={amt}
                                        className="flex-1 min-w-20 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-yellow-400/50 transition-all font-bold"
                                        onClick={() => pay(amt)}
                                    >
                                        ₹{amt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    )
};

export default PaymentPage;