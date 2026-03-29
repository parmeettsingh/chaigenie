"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext"; 

const GenieChat = () => {
    const { data: session } = useSession();
    const { addToCart } = useCart(); 
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'genie', text: 'Salam! I am the Chai Genie. What is your wish today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef(null);

    const pastOrders = "Masala Chai, Bun Maska";

    // FIX 1: Simplified scroll logic to prevent useEffect size warnings
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isLoading, isOpen]);

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({
                    message: input,
                    userData: {
                        name: session?.user?.name || "Guest",
                        pastOrders: pastOrders
                    },
                    // FIX 2: Filter history so the FIRST message sent is always 'user'
                    // This prevents the "got model" error from Google Generative AI
                    history: messages
                        .filter((m, i) => !(i === 0 && m.role === 'genie')) 
                        .map(m => ({
                            role: m.role === 'genie' ? 'model' : 'user',
                            parts: [{ text: m.text }]
                        }))
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.reply);

            let genieReply = data.reply;

            if (genieReply.includes("[ADD_TO_CART:")) {
                const itemName = genieReply.split("[ADD_TO_CART:")[1].split("]")[0].trim();
                
                const menuMapping = {
                    "Masala Chai": { id: 'm1', name: 'Masala Chai', price: 20 },
                    "Kesar Pista Chai": { id: 'm2', name: 'Kesar Pista Chai', price: 25 },
                    "Samosa": { id: 'm3', name: 'Samosa', price: 15 },
                    "Bun Maska": { id: 'm4', name: 'Bun Maska', price: 30 }
                };

                if (menuMapping[itemName]) {
                    addToCart(menuMapping[itemName]);
                    genieReply = genieReply.replace(/\[ADD_TO_CART:.*\]/, "✨ It is done! I have added it to your tray.");
                }
            }

            setMessages(prev => [...prev, { role: 'genie', text: genieReply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'genie', text: "The lamp is flickering... Please try your wish again!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-[350px] h-[450px] bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-yellow-400 p-5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🧞‍♂️</span>
                                <div>
                                    <h3 className="text-black font-black text-xs uppercase tracking-widest">Chai Genie</h3>
                                    <p className="text-black/60 text-[8px] font-bold uppercase">Online & Brewing</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setMessages([{ role: 'genie', text: 'Thy history is erased. What is your new wish?' }])}
                                className="text-black/40 hover:text-black transition-colors"
                            >
                                🧹
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar text-white">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                                        ? 'bg-yellow-400 text-black rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-white rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 text-white p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                                    </div>
                                </div>
                            )}
                            <div ref={scrollRef} />
                        </div>

                        {!isLoading && messages.length < 4 && (
                            <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
                                {['Show Menu', 'Add Masala Chai', 'Best Seller?'].map((cmd) => (
                                    <button
                                        key={cmd}
                                        onClick={() => setInput(cmd)}
                                        className="whitespace-nowrap bg-white/5 border border-white/10 text-[10px] text-white px-3 py-1.5 rounded-full hover:bg-yellow-400 hover:text-black transition-all"
                                    >
                                        {cmd}
                                    </button>
                                ))}
                            </div>
                        )}

                        <form onSubmit={handleSend} className="p-4 border-t border-white/5 flex gap-2 bg-slate-900/50">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isLoading ? "The Genie is thinking..." : "Type your wish..."}
                                disabled={isLoading}
                                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-yellow-400 transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`p-2 rounded-xl transition-all flex items-center justify-center min-w-[40px] ${isLoading ? 'bg-white/5' : 'bg-yellow-400 text-black'}`}
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin" />
                                ) : (
                                    '🚀'
                                )}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-[0_10px_30px_-5px_rgba(250,204,21,0.5)] border-4 border-slate-950 relative z-[101]"
            >
                {isOpen ? '❌' : '🧞‍♂️'}
            </motion.button>
        </div>
    );
};

export default GenieChat;