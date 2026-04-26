"use client";

import React, { useState } from 'react';
import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { notify } from '@/utils/toast';
import Image from 'next/image';
import Script from "next/script";

const CheckoutPage = () => {
    const { cartItems, subtotal } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        pincode: "", // Added pincode to state
        notes: "",
        paymentMethod: "upi",
    });

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        
        // Mandatory PIN Code check
        if (!formData.pincode || formData.pincode.length !== 6) {
            notify.error("Genie needs a valid 6-digit PIN code to find you!");
            return;
        }

        setLoading(true);

        if (formData.paymentMethod === 'cash') {
            setTimeout(() => {
                setLoading(false);
                notify.success("Wish Received! Pay the Genie at your door. ☕✨");
                router.push(`/order-success?pincode=${formData.pincode}`);
            }, 2000);
            return;
        }

        try {
            const totalBill = Math.round(subtotal * 1.05); 
            
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    amount: totalBill,
                    pincode: formData.pincode // Sending pincode to backend
                }),
            });
            
            const data = await res.json();
            const orderId = data.orderId;

            const options = {
                key: process.env.NEXT_PUBLIC_KEY_ID,
                amount: totalBill * 100,
                currency: "INR",
                name: "ChaiGenie",
                description: "Your Chai Wish",
                order_id: orderId,
                prefill: {
                    name: formData.name,
                    contact: formData.phone,
                    method: formData.paymentMethod === 'upi' ? 'upi' : '',
                },
                handler: function (response) {
                    notify.success("Payment Received! The Genie is on the way.");
                    router.push("/order-success");
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                },
                theme: {
                    color: "#fac815", 
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            notify.error("Genie is tired! Payment failed. Please try again.");
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-center items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h2 className="text-3xl font-black italic text-yellow-400 mb-6 uppercase tracking-widest">Your Lamp is Empty</h2>
                    <button
                        onClick={() => router.push("/menu")}
                        className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all"
                    >
                        Go to Menu
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)] opacity-30 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="mb-12 text-center md:text-left">
                    <motion.span
                        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        className="bg-yellow-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase mb-4 inline-block tracking-widest"
                    >
                        Final Step
                    </motion.span>
                    <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter">
                        COMPLETE YOUR <span className="text-yellow-400">WISH</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* --- LEFT: DELIVERY FORM --- */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7 bg-white/5 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
                    >
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                                    <input
                                        required type="text"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition-all text-sm"
                                        placeholder="Enter your name"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Phone Number</label>
                                    <input
                                        required type="tel"
                                        className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition-all text-sm"
                                        placeholder="+91 00000 00000"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Added PIN Code Field here */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">PIN Code</label>
                                <input
                                    required 
                                    type="text"
                                    maxLength="6"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition-all text-sm"
                                    placeholder="6-Digit PIN Code"
                                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Delivery Address</label>
                                <textarea
                                    required rows="3"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition-all text-sm resize-none"
                                    placeholder="Where should the Genie drop it?"
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">Special Notes (Optional)</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-yellow-400 transition-all text-sm"
                                    placeholder="Extra ginger? Less sugar?"
                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4 pt-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">
                                    Select Payment Method
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { id: 'upi', label: 'UPI / Scan', icon: '📱' },
                                        { id: 'card', label: 'Card', icon: '💳' },
                                        { id: 'cash', label: 'Cash on Delivery', icon: '💵' }
                                    ].map((method) => (
                                        <div
                                            key={method.id}
                                            onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                                            className={`cursor-pointer p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${formData.paymentMethod === method.id
                                                    ? "bg-yellow-400/10 border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.1)]"
                                                    : "bg-slate-900/50 border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <span className="text-2xl">{method.icon}</span>
                                            <span className={`text-[10px] font-black uppercase tracking-tighter ${formData.paymentMethod === method.id ? "text-yellow-400" : "text-gray-400"
                                                }`}>
                                                {method.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-5 rounded-4xl font-black uppercase tracking-[0.2em] shadow-[0_15px_30px_-10px_rgba(250,204,21,0.3)] transition-all active:scale-95 disabled:opacity-50"
                            >
                                {loading ? "BREWING YOUR ORDER..." : "GRANT MY WISH"}
                            </button>
                        </form>
                    </motion.div>

                    {/* --- RIGHT: ORDER SUMMARY --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <div className="bg-[#0b0b0e] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
                            <h2 className="text-xl font-black italic text-yellow-400 mb-8 uppercase tracking-widest border-b border-white/5 pb-4">Order Summary</h2>

                            <div className="space-y-6 mb-8 max-h-75 overflow-y-auto no-scrollbar pr-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 group">
                                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                            <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm">{item.name}</h4>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-black text-sm">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <span>GST (5%)</span>
                                    <span>₹{(subtotal * 0.05).toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between text-white font-black text-2xl pt-4">
                                    <span>TOTAL BILL</span>
                                    <span className="text-yellow-400">₹{(subtotal * 1.05).toFixed(0)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-400/10 border border-yellow-400/20 p-6 rounded-3xl flex items-center gap-4">
                            <span className="text-2xl">⚡</span>
                            <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed text-yellow-400">
                                The Genie guarantees delivery in 20 minutes or your next chai is on us!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;